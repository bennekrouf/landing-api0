// src/lib/fit-score.ts
//
// The fit check (/fit, /fr/fit): a visitor answers one question per screen and
// gets a score out of 100 saying how ready they are for an api0 pilot. This
// file holds the questions' ids, the points of each answer and the scoring;
// the wording lives in i18n/{en,fr}.ts under `fit`, keyed by the same ids.
//
// Gaps are things api0 cannot do for them yet (see the "claims that wait"
// table in positioning-update-2026-10.md): they are shown honestly, and they
// lower the score a little, not to zero. Only having no API at all is a
// blocker.

export type QuestionId =
  | 'api'
  | 'reach'
  | 'description'
  | 'audience'
  | 'channels'
  | 'identity'
  | 'workflow'
  | 'people'
  | 'timeline'
  | 'needs';

export type Option = {
  id: string;
  /** Points this answer is worth, out of the question's best answer. */
  points: number;
  /** A strength to show on the result page. */
  strength?: string;
  /** A gap to show on the result page. */
  gap?: string;
  /** Exclusive in a multi-choice question: picking it clears the others. */
  exclusive?: boolean;
  /** No pilot is possible with this answer, whatever the score. */
  blocker?: boolean;
  /** Picking it asks the visitor to describe their case in their own words;
   *  the text goes into the email they send, so api0 learns what to support next. */
  freeText?: boolean;
};

export type Question = {
  id: QuestionId;
  multi?: boolean;
  options: Option[];
  /** Asked only when this returns true for the answers so far. */
  when?: (answers: Answers) => boolean;
};

export type Answers = Partial<Record<QuestionId, string[]>>;

const hasApi = (a: Answers) => !!a.api?.length && !a.api.includes('none');

export const QUESTIONS: Question[] = [
  {
    id: 'api',
    options: [
      { id: 'rest', points: 20, strength: 'restApi' },
      { id: 'other', points: 12, gap: 'nonRest' },
      { id: 'unsure', points: 6, gap: 'apiUnknown' },
      { id: 'none', points: 0, gap: 'noApi', blocker: true },
    ],
  },
  {
    id: 'reach',
    when: hasApi,
    options: [
      { id: 'public', points: 10, strength: 'reachable' },
      { id: 'private', points: 6, gap: 'privateApi' },
      { id: 'unsure', points: 4 },
    ],
  },
  {
    id: 'description',
    when: hasApi,
    options: [
      { id: 'openapi', points: 10, strength: 'openapi' },
      { id: 'docs', points: 7 },
      { id: 'none', points: 4 },
    ],
  },
  {
    id: 'audience',
    options: [
      { id: 'customers', points: 10, strength: 'vendor' },
      { id: 'field', points: 10, strength: 'field' },
      { id: 'office', points: 8 },
      { id: 'me', points: 3 },
    ],
  },
  {
    id: 'channels',
    multi: true,
    options: [
      { id: 'teams', points: 10 },
      { id: 'whatsapp', points: 10 },
      { id: 'telegram', points: 8 },
      { id: 'claude', points: 10 },
      { id: 'unsure', points: 5, exclusive: true },
    ],
  },
  {
    id: 'identity',
    options: [
      { id: 'own', points: 10, strength: 'perUser' },
      { id: 'sso', points: 10, strength: 'sso' },
      { id: 'shared', points: 7 },
      { id: 'none', points: 5 },
      { id: 'other', points: 6, gap: 'otherSignIn', freeText: true },
    ],
  },
  {
    id: 'workflow',
    options: [
      { id: 'clear', points: 10, strength: 'workflow' },
      { id: 'ideas', points: 6 },
      { id: 'exploring', points: 2, gap: 'noWorkflow' },
    ],
  },
  {
    id: 'people',
    options: [
      { id: 'xs', points: 3 },
      { id: 's', points: 7 },
      { id: 'm', points: 10 },
      { id: 'l', points: 9 },
    ],
  },
  {
    id: 'timeline',
    options: [
      { id: 'month', points: 10, strength: 'soon' },
      { id: 'quarter', points: 7 },
      { id: 'later', points: 3 },
      { id: 'none', points: 0 },
    ],
  },
  {
    id: 'needs',
    multi: true,
    options: [
      { id: 'teamsChannels', points: 0, gap: 'teamsChannels' },
      { id: 'voice', points: 0, gap: 'voice' },
      { id: 'manyCustomers', points: 0, gap: 'manyCustomers' },
      { id: 'none', points: 0, exclusive: true },
    ],
  },
];

/** Points taken off for each thing in `needs` that api0 does not do yet. */
const NEED_PENALTY = 3;

/** The questions to ask, in order, given the answers so far. */
export function visibleQuestions(answers: Answers): Question[] {
  return QUESTIONS.filter((q) => !q.when || q.when(answers));
}

/** A question's best possible points: the best option, or for a multi question the sum capped at 10. */
function maxPoints(q: Question): number {
  if (q.id === 'needs') return 0;
  return Math.max(...q.options.map((o) => o.points));
}

function pointsFor(q: Question, picked: string[]): number {
  const opts = q.options.filter((o) => picked.includes(o.id));
  if (q.id === 'needs') return -NEED_PENALTY * opts.filter((o) => o.gap).length;
  if (q.multi) return Math.min(maxPoints(q), opts.reduce((s, o) => s + o.points, 0));
  return opts[0]?.points ?? 0;
}

export type Tier = 'strong' | 'good' | 'early' | 'notYet';

export type Result = {
  /** 0 to 100. */
  score: number;
  tier: Tier;
  strengths: string[];
  gaps: string[];
};

export function scoreFit(answers: Answers): Result {
  const qs = visibleQuestions(answers);
  // Questions skipped because there is no API still count against the score.
  const max = QUESTIONS.reduce((s, q) => s + maxPoints(q), 0);
  let got = 0;
  let blocked = false;
  const strengths: string[] = [];
  const gaps: string[] = [];
  for (const q of qs) {
    const picked = answers[q.id] ?? [];
    got += pointsFor(q, picked);
    for (const o of q.options) {
      if (!picked.includes(o.id)) continue;
      if (o.blocker) blocked = true;
      if (o.strength) strengths.push(o.strength);
      if (o.gap) gaps.push(o.gap);
    }
  }
  if ((answers.channels?.length ?? 0) >= 2 && !answers.channels?.includes('unsure')) strengths.push('multiChannel');
  const score = Math.max(0, Math.min(100, Math.round((got / max) * 100)));
  const tier: Tier = blocked ? 'notYet' : score >= 75 ? 'strong' : score >= 50 ? 'good' : 'early';
  return { score, tier, strengths, gaps };
}

/** The new answer list after clicking `optionId` in question `q`. */
export function toggle(q: Question, current: string[], optionId: string): string[] {
  if (!q.multi) return [optionId];
  const opt = q.options.find((o) => o.id === optionId);
  if (current.includes(optionId)) return current.filter((id) => id !== optionId);
  if (opt?.exclusive) return [optionId];
  const exclusive = new Set(q.options.filter((o) => o.exclusive).map((o) => o.id));
  return [...current.filter((id) => !exclusive.has(id)), optionId];
}
