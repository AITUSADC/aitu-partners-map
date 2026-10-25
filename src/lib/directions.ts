type Coordinates = { latitude: number; longitude: number };

export function getDirectionsUrl(from: Coordinates, to: Coordinates): string {
  const origin = `${from.longitude},${from.latitude}`;
  const destination = `${to.longitude},${to.latitude}`;
  return `https://2gis.ru/astana/directions/tab/bus/points/${origin}%7C${destination}`;
}
