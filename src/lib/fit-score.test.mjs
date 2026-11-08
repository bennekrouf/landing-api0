// Run with `yarn test` (Node's own test runner; Node strips the TypeScript types).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS, scoreFit, toggle, visibleQuestions } from './fit-score.ts';

const best = {
  api: ['rest'],
  reach: ['public'],
  description: ['openapi'],
  audience: ['customers'],
  channels: ['teams', 'claude'],
  identity: ['own'],
  workflow: ['clear'],
  people: ['m'],
  timeline: ['month'],
  needs: ['none'],
};

test('the best answers score 100 and are a strong fit', () => {
  const r = scoreFit(best);
  assert.equal(r.score, 100);
  assert.equal(r.tier, 'strong');
  assert.ok(r.strengths.includes('restApi'));
  assert.ok(r.strengths.includes('multiChannel'));
  assert.deepEqual(r.gaps, []);
});

test('having no API is not yet a fit, whatever else is answered', () => {
  const r = scoreFit({ ...best, api: ['none'] });
  assert.equal(r.tier, 'notYet');
  assert.ok(r.gaps.includes('noApi'));
});

test('without an API, the questions about it are skipped', () => {
  const ids = visibleQuestions({ api: ['none'] }).map((q) => q.id);
  assert.ok(!ids.includes('reach'));
  assert.ok(!ids.includes('description'));
  assert.equal(visibleQuestions({ api: ['rest'] }).length, QUESTIONS.length);
});

test('needs api0 does not cover yet show as gaps and cost a few points', () => {
  const r = scoreFit({ ...best, needs: ['swissHosting', 'voice'] });
  assert.deepEqual(r.gaps, ['swissHosting', 'voice']);
  assert.ok(r.score < 100 && r.score >= 90);
  assert.equal(r.tier, 'strong');
});

test('an early-stage prospect lands in early', () => {
  const r = scoreFit({
    api: ['unsure'], reach: ['unsure'], description: ['none'], audience: ['me'],
    channels: ['unsure'], identity: ['none'], workflow: ['exploring'], people: ['xs'], timeline: ['none'], needs: ['none'],
  });
  assert.equal(r.tier, 'early');
});

test('an exclusive option clears the others, and another option clears it', () => {
  const channels = QUESTIONS.find((q) => q.id === 'channels');
  assert.deepEqual(toggle(channels, ['teams', 'claude'], 'unsure'), ['unsure']);
  assert.deepEqual(toggle(channels, ['unsure'], 'teams'), ['teams']);
  assert.deepEqual(toggle(channels, ['teams'], 'teams'), []);
});
