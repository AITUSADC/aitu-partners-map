import assert from "node:assert/strict";
import test from "node:test";
import { translate, translations, englishAliases } from "../src/lib/translations.ts";
import { partners } from "../src/data/partners.ts";
import { campuses } from "../src/data/campuses.ts";

test("partner and campus copy has both Russian and Kazakh translations", () => {
  const copy = partners.flatMap((partner) => [partner.offerLabel, partner.description, partner.terms, partner.location.address, partner.location.name]);
  copy.push(...campuses.flatMap((campus) => [campus.name, campus.description, campus.address, campus.locationNote]));
  for (const text of copy) {
    if (text === "MEGA Silk Way") continue;
    const entry = translations[englishAliases[text] ?? text];
    assert.ok(entry?.ru && entry?.kk, `Missing translation: ${text}`);
  }
});

test("switching language normalizes campus copy and preserves proper names", () => {
  assert.equal(translate("en", "Корпус AITU"), "AITU campus");
  assert.equal(translate("ru", "Корпус AITU"), "Корпус AITU");
  assert.equal(translate("kk", "Корпус AITU"), "AITU корпусы");
  for (const locale of ["en", "ru", "kk"] as const) {
    assert.equal(translate(locale, "Urban Coffee"), "Urban Coffee");
    assert.equal(translate(locale, "EXPO C1"), "EXPO C1");
  }
});
