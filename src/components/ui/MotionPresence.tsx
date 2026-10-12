"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const MotionOpenContext = createContext(true);
export function useMotionOpen() { return useContext(MotionOpenContext); }

// Keep the last visible content mounted until its exit animation finishes.
export function MotionPresence({ open, children }: { open: boolean; children: ReactNode }) {
  const [snapshot, setSnapshot] = useState({ open, children, present: open });

  if (open !== snapshot.open || (open && children !== snapshot.children)) {
    setSnapshot({ open, children: open ? children : snapshot.children, present: open || snapshot.present });
  }

  useEffect(() => {
    if (open || !snapshot.present) return;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180;
    const timer = setTimeout(() => {
      setSnapshot((current) => current.open ? current : { ...current, present: false });
    }, duration);
    return () => clearTimeout(timer);
  }, [open, snapshot.present]);

  if (!snapshot.present) return null;

  return <MotionOpenContext.Provider value={open}><div className="motion-presence" data-state={open ? "open" : "closing"} inert={!open} aria-hidden={!open || undefined} onAnimationEnd={(event) => {
    if (!open && (event.animationName === "panel-out" || event.animationName === "dropdown-out")) {
      setSnapshot((current) => current.open ? current : { ...current, present: false });
    }
  }}>{open ? children : snapshot.children}</div></MotionOpenContext.Provider>;
}
