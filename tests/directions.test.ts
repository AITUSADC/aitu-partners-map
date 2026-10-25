import assert from "node:assert/strict";
import test from "node:test";
import { campuses } from "../src/data/campuses.ts";
import { partners } from "../src/data/partners.ts";
import { getDirectionsUrl } from "../src/lib/directions.ts";

test("directions use each selected campus while keeping the partner destination", () => {
  const destination = partners.find((partner) => partner.id === "study-hub")!.location;
  for (const campus of campuses) {
    const url = new URL(getDirectionsUrl(campus, destination));
    const points = decodeURIComponent(url.pathname).split("/points/")[1].split("|");
    assert.equal(points[0], `${campus.longitude},${campus.latitude}`);
    assert.equal(points[1], "71.4258,51.1286");
  }
});

test("directions open an absolute HTTPS 2GIS URL with longitude before latitude", () => {
  const url = new URL(getDirectionsUrl(
    { latitude: 12.34, longitude: 56.78 },
    { latitude: -23.45, longitude: -67.89 },
  ));
  assert.equal(url.protocol, "https:");
  assert.equal(url.hostname, "2gis.ru");
  assert.equal(url.pathname, "/astana/directions/tab/bus/points/56.78,12.34%7C-67.89,-23.45");
  assert.equal(decodeURIComponent(url.pathname), "/astana/directions/tab/bus/points/56.78,12.34|-67.89,-23.45");
  assert.equal(url.pathname.split("/tab/")[1].split("/")[0], "bus");
  assert.equal(url.search, "");
});
