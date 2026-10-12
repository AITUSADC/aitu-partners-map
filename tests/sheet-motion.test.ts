import assert from "node:assert/strict";
import test from "node:test";
import { resistedSheetHeight } from "../src/lib/sheet-motion.ts";

test("sheet tracks the finger exactly between its endpoints", () => {
  for (const height of [72, 100, 250, 520]) assert.equal(resistedSheetHeight(height, 72, 520), height);
});

test("pulls beyond either endpoint move a little without crossing the elastic limits", () => {
  for (const pull of [1, 40, 80, 500, 10000]) {
    const bottom = resistedSheetHeight(72 - pull, 72, 520);
    const top = resistedSheetHeight(520 + pull, 72, 520);
    assert.ok(bottom < 72 && bottom > 66);
    assert.ok(top > 520 && top < 532);
    assert.ok(72 - bottom < pull && top - 520 < pull);
  }
});

test("resistance is continuous and becomes stronger as the pull increases", () => {
  assert.ok(Math.abs(resistedSheetHeight(520.001, 72, 520) - 520) < 0.001);
  assert.ok(Math.abs(resistedSheetHeight(71.999, 72, 520) - 72) < 0.001);
  const first = resistedSheetHeight(560, 72, 520) - 520;
  const next = resistedSheetHeight(600, 72, 520) - resistedSheetHeight(560, 72, 520);
  assert.ok(next > 0 && next < first);
});
