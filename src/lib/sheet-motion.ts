export function resistedSheetHeight(height: number, minimum: number, maximum: number): number {
  const resist = (excess: number, limit: number) => limit * excess / (excess + limit / 0.18);
  if (height < minimum) return minimum - resist(minimum - height, 6);
  if (height > maximum) return maximum + resist(height - maximum, 12);
  return height;
}
