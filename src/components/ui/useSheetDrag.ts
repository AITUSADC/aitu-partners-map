"use client";

import { useEffect, useRef, useState, type PointerEvent, type MouseEvent } from "react";

const collapsedHeight = 72;
const expandedHeight = () => Math.min(window.innerHeight * 0.64, 560);

export function useSheetDrag(expanded: boolean, onExpandedChange: (expanded: boolean) => void) {
  const sheetRef = useRef<HTMLElement>(null);
  const [dragging, setDragging] = useState(false);
  const frame = useRef<number | null>(null);
  const suppressClick = useRef(false);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gesture = useRef<{
    pointerId: number; x: number; y: number; startHeight: number; height: number;
    expanded: boolean; moved: boolean; owner: HTMLElement;
    samples: { y: number; time: number }[];
  } | null>(null);

  useEffect(() => {
    function cancelForResize() {
      const current = gesture.current;
      gesture.current = null;
      if (current?.owner.hasPointerCapture(current.pointerId)) current.owner.releasePointerCapture(current.pointerId);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = null;
      sheetRef.current?.style.removeProperty("height");
      setDragging(false);
    }
    window.addEventListener("resize", cancelForResize);
    return () => {
      window.removeEventListener("resize", cancelForResize);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      if (clickTimer.current !== null) clearTimeout(clickTimer.current);
    };
  }, []);

  function onPointerDown(event: PointerEvent<HTMLElement>) {
    if (!event.isPrimary || event.button !== 0 || !window.matchMedia("(max-width: 1023px)").matches) return;
    const sheet = sheetRef.current;
    if (!sheet) return;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    gesture.current = {
      pointerId: event.pointerId, x: event.clientX, y: event.clientY,
      startHeight: sheet.getBoundingClientRect().height, height: sheet.getBoundingClientRect().height,
      expanded, moved: false, owner: event.currentTarget,
      samples: [{ y: event.clientY, time: event.timeStamp }],
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    const current = gesture.current;
    if (!current || current.pointerId !== event.pointerId) return;
    const delta = current.y - event.clientY;
    if (!current.moved) {
      if (Math.abs(delta) < 8) return;
      if (Math.abs(event.clientX - current.x) > Math.abs(delta)) {
        gesture.current = null;
        if (current.owner.hasPointerCapture(event.pointerId)) current.owner.releasePointerCapture(event.pointerId);
        return;
      }
      current.moved = true;
      current.owner.setPointerCapture(event.pointerId);
      setDragging(true);
    }
    event.preventDefault();
    current.height = Math.max(collapsedHeight, Math.min(expandedHeight(), current.startHeight + delta));
    current.samples.push({ y: event.clientY, time: event.timeStamp });
    current.samples = current.samples.filter((sample) => event.timeStamp - sample.time <= 100);
    if (frame.current === null) frame.current = requestAnimationFrame(() => {
      frame.current = null;
      if (gesture.current && sheetRef.current) sheetRef.current.style.height = `${gesture.current.height}px`;
    });
  }

  function finish(event: PointerEvent<HTMLElement>, cancelled = false) {
    const current = gesture.current;
    if (!current || current.pointerId !== event.pointerId) return;
    gesture.current = null;
    if (!current.moved) {
      if (!cancelled) { suppressGestureClick(); onExpandedChange(!current.expanded); }
      if (current.owner.hasPointerCapture(event.pointerId)) current.owner.releasePointerCapture(event.pointerId);
      return;
    }
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    const sheet = sheetRef.current;
    if (sheet) {
      sheet.style.height = `${current.height}px`;
      // Flush the finger-tracked height before restoring the settling transition.
      sheet.getBoundingClientRect();
    }
    const recent = current.samples.filter((sample) => event.timeStamp - sample.time <= 100);
    const first = recent[0];
    const velocity = first && event.timeStamp > first.time ? (first.y - event.clientY) / (event.timeStamp - first.time) : 0;
    const travel = current.y - event.clientY;
    const threshold = (expandedHeight() - collapsedHeight) * 0.3;
    let target = current.expanded;
    if (!cancelled) {
      if (Math.abs(travel) >= 12 && Math.abs(velocity) >= 0.45) target = velocity > 0;
      else if (!current.expanded && travel >= threshold) target = true;
      else if (current.expanded && travel <= -threshold) target = false;
    }
    suppressGestureClick();
    setDragging(false);
    onExpandedChange(target);
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      if (!gesture.current) sheetRef.current?.style.removeProperty("height");
    });
    if (current.owner.hasPointerCapture(event.pointerId)) current.owner.releasePointerCapture(event.pointerId);
  }

  function suppressGestureClick() {
    suppressClick.current = true;
    if (clickTimer.current !== null) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => { suppressClick.current = false; }, 500);
  }

  function onClickCapture(event: MouseEvent<HTMLElement>) {
    if (event.detail === 0) return;
    if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; }
  }

  function onPointerDownCapture() {
    // A new deliberate tap must never be mistaken for the prior drag's click.
    suppressClick.current = false;
    if (clickTimer.current !== null) clearTimeout(clickTimer.current);
  }

  return {
    sheetRef, dragging, onClickCapture, onPointerDownCapture,
    dragHandlers: { onPointerDown, onPointerMove, onPointerUp: (event: PointerEvent<HTMLElement>) => finish(event), onPointerCancel: (event: PointerEvent<HTMLElement>) => finish(event, true), onLostPointerCapture: (event: PointerEvent<HTMLElement>) => finish(event, true) },
  };
}
