import assert from "node:assert/strict";
import test from "node:test";
import { partners, AITU_LOCATION } from "../src/data/partners.ts";
import { filterPartners, distanceKm } from "../src/lib/partners.ts";

test("search and category combine, and clearing both restores all partners", () => {
  assert.deepEqual(filterPartners(partners, "coffee", " LUNA ").map((partner) => partner.id), ["luna-coffee"]);
  assert.deepEqual(filterPartners(partners, "sport", "Luna"), []);
  assert.equal(filterPartners(partners, "all", "").length, 6);
  assert.equal(filterPartners(partners, "coffee", "").length, 1);
  assert.deepEqual(filterPartners(partners, "all", "not a partner"), []);
});

test("partner dataset has unique IDs, complete offer text, and Astana locations", () => {
  assert.equal(new Set(partners.map((partner) => partner.id)).size, partners.length);
  for (const partner of partners) {
    assert.ok(distanceKm(AITU_LOCATION, partner.location) < 15, `${partner.name} is near AITU`);
    assert.ok(partner.description.trim());
    assert.ok(partner.terms.trim());
    assert.ok(partner.location.address.trim());
    assert.ok(!/sample|fictional/i.test(partner.terms));
  }
});

test("distance is zero at the origin and symmetric", () => {
  const destination = partners[3].location;
  assert.equal(distanceKm(AITU_LOCATION, AITU_LOCATION), 0);
  assert.ok(Math.abs(distanceKm(AITU_LOCATION, destination) - distanceKm(destination, AITU_LOCATION)) < 0.00001);
});
