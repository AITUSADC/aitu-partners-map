import assert from "node:assert/strict";
import test from "node:test";
import { partners, AITU_LOCATION } from "../src/data/partners.ts";
import { filterPartners, distanceKm } from "../src/lib/partners.ts";

test("search and category combine, and clearing both restores all partners", () => {
  assert.deepEqual(filterPartners(partners, "coffee", " URBAN ").map((partner) => partner.id), ["urban-coffee"]);
  assert.deepEqual(filterPartners(partners, "sport", "Urban"), []);
  assert.equal(filterPartners(partners, "all", "").length, 12);
  assert.equal(filterPartners(partners, "coffee", "").length, 2);
  assert.deepEqual(filterPartners(partners, "all", "not a partner"), []);
});

test("demo dataset has unique IDs, covers every category, and remains near Astana", () => {
  assert.equal(new Set(partners.map((partner) => partner.id)).size, partners.length);
  assert.equal(new Set(partners.map((partner) => partner.category)).size, 6);
  for (const partner of partners) {
    assert.ok(distanceKm(AITU_LOCATION, partner.location) < 15, `${partner.name} is near AITU`);
    assert.ok(partner.terms.includes("Sample offer"));
  }
});

test("distance is zero at the origin and symmetric", () => {
  const destination = partners[3].location;
  assert.equal(distanceKm(AITU_LOCATION, AITU_LOCATION), 0);
  assert.ok(Math.abs(distanceKm(AITU_LOCATION, destination) - distanceKm(destination, AITU_LOCATION)) < 0.00001);
});
