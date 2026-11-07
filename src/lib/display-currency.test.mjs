// Run with `yarn test` (Node's own test runner; Node strips the TypeScript types).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pickCurrency } from './display-currency.ts';

test('a Swiss language region shows CHF', () => {
  for (const tag of ['fr-CH', 'de-CH', 'it-CH', 'gsw-CH', 'de-LI']) {
    assert.equal(pickCurrency([tag], 'America/New_York'), 'chf', tag);
  }
});

test('the Swiss time zone shows CHF, even with a US or eurozone language', () => {
  assert.equal(pickCurrency(['en-US', 'en'], 'Europe/Zurich'), 'chf');
  assert.equal(pickCurrency(['fr-FR'], 'Europe/Zurich'), 'chf');
  assert.equal(pickCurrency(['de'], 'Europe/Vaduz'), 'chf');
});

test('a eurozone language region shows EUR', () => {
  for (const tag of ['fr-FR', 'de-DE', 'it-IT', 'es-ES', 'nl-NL', 'pt-PT', 'fi-FI', 'el-GR', 'bg-BG']) {
    assert.equal(pickCurrency([tag], 'UTC'), 'eur', tag);
  }
});

test('a eurozone time zone shows EUR when the language has no region', () => {
  assert.equal(pickCurrency(['fr'], 'Europe/Paris'), 'eur');
  assert.equal(pickCurrency(['en-US'], 'Europe/Berlin'), 'eur');
});

test('CHF wins over EUR when both appear', () => {
  assert.equal(pickCurrency(['fr-FR', 'fr-CH'], 'Europe/Paris'), 'chf');
});

test('everyone else sees USD', () => {
  assert.equal(pickCurrency(['en-US'], 'America/Los_Angeles'), 'usd');
  assert.equal(pickCurrency(['en-GB'], 'Europe/London'), 'usd');
  assert.equal(pickCurrency(['ja-JP'], 'Asia/Tokyo'), 'usd');
  assert.equal(pickCurrency(['fr'], undefined), 'usd');
  assert.equal(pickCurrency([], undefined), 'usd');
});

test('malformed language tags are ignored', () => {
  assert.equal(pickCurrency(['not a tag', 'de-AT'], undefined), 'eur');
  assert.equal(pickCurrency([''], 'Asia/Tokyo'), 'usd');
});
