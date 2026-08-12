import { describe, it, expect } from 'vitest';

// Enforcement rule conditions copied verbatim from
// components/FourX4View.jsx runSave() lines 593-651.
// Reproduced here as pure helpers so the logic can be tested in
// isolation without mounting the React component.

function hasShortName(drafts) {
  return drafts.find(
    d => d.name.trim().split(/\s+/).filter(Boolean).length < 5
  );
}

function hasMissingMeasurable(drafts) {
  return drafts.find(d => {
    if (d.type !== 'activation') return false;
    const hasTimeCost = !d.timeDNA && d.time_cost_minutes !== null && d.time_cost_minutes > 0;
    if (hasTimeCost) return false;
    return d.measurable_value === null || !d.measurable_unit;
  });
}

function hasBelowTimeFloor(drafts) {
  return drafts.find(
    d => d.type === 'activation' &&
      !d.timeDNA &&
      d.time_cost_minutes !== null &&
      d.time_cost_minutes < 10
  );
}

function hasMissingDeclaration(drafts) {
  return drafts.find(
    d => d.type === 'deactivation' &&
      (!d.deact_declaration || d.deact_declaration.trim().length < 3)
  );
}

function hasBadDeactFreq(drafts) {
  return drafts.find(
    d => d.type === 'deactivation' &&
      d.deact_uses_weekly_target &&
      (d.deact_frequency === null || d.deact_frequency < 3)
  );
}

// Minimal draft factory — only the fields each rule reads.
function draft(overrides = {}) {
  return {
    name: 'Do five words here today',
    type: 'activation',
    measurable_value: 3,
    measurable_unit: 'miles',
    timeDNA: false,
    time_cost_minutes: 30,
    deact_declaration: '',
    deact_uses_weekly_target: false,
    deact_frequency: null,
    ...overrides,
  };
}

describe('Rule 2 — Activation measurable target required', () => {
  it('passes when activation has measurable_value and measurable_unit', () => {
    const drafts = [draft({ type: 'activation', measurable_value: 5, measurable_unit: 'miles' })];
    expect(hasMissingMeasurable(drafts)).toBeUndefined();
  });

  it('blocked when activation has measurable_value null and no time cost', () => {
    const drafts = [draft({ type: 'activation', measurable_value: null, measurable_unit: 'miles', time_cost_minutes: null })];
    expect(hasMissingMeasurable(drafts)).toBeTruthy();
  });

  it('blocked when activation has measurable_unit empty string and no time cost', () => {
    const drafts = [draft({ type: 'activation', measurable_value: 5, measurable_unit: '', time_cost_minutes: null })];
    expect(hasMissingMeasurable(drafts)).toBeTruthy();
  });
});

describe('Rule 3 — Activation time floor 10 minutes', () => {
  it('passes when activation time_cost_minutes >= 10', () => {
    const drafts = [draft({ type: 'activation', timeDNA: false, time_cost_minutes: 10 })];
    expect(hasBelowTimeFloor(drafts)).toBeUndefined();
  });

  it('passes when timeDNA is true (floor does not apply)', () => {
    const drafts = [draft({ type: 'activation', timeDNA: true, time_cost_minutes: 5 })];
    expect(hasBelowTimeFloor(drafts)).toBeUndefined();
  });

  it('blocked when activation time_cost_minutes < 10 and timeDNA false', () => {
    const drafts = [draft({ type: 'activation', timeDNA: false, time_cost_minutes: 9 })];
    expect(hasBelowTimeFloor(drafts)).toBeTruthy();
  });
});

describe('Rule 4 — Deactivation declaration required', () => {
  it('passes when deactivation has deact_declaration >= 3 chars', () => {
    const drafts = [draft({ type: 'deactivation', deact_declaration: 'Soda every lunch' })];
    expect(hasMissingDeclaration(drafts)).toBeUndefined();
  });

  it('blocked when deact_declaration is empty string', () => {
    const drafts = [draft({ type: 'deactivation', deact_declaration: '' })];
    expect(hasMissingDeclaration(drafts)).toBeTruthy();
  });

  it('blocked when deact_declaration is less than 3 chars', () => {
    const drafts = [draft({ type: 'deactivation', deact_declaration: 'ab' })];
    expect(hasMissingDeclaration(drafts)).toBeTruthy();
  });
});

describe('Rule 5 — Deactivation weekly target minimum 3', () => {
  it('passes when deact_uses_weekly_target false (binary — no floor)', () => {
    const drafts = [draft({ type: 'deactivation', deact_uses_weekly_target: false, deact_frequency: null })];
    expect(hasBadDeactFreq(drafts)).toBeUndefined();
  });

  it('passes when deact_uses_weekly_target true and deact_frequency >= 3', () => {
    const drafts = [draft({ type: 'deactivation', deact_uses_weekly_target: true, deact_frequency: 3 })];
    expect(hasBadDeactFreq(drafts)).toBeUndefined();
  });

  it('blocked when deact_uses_weekly_target true and deact_frequency < 3', () => {
    const drafts = [draft({ type: 'deactivation', deact_uses_weekly_target: true, deact_frequency: 2 })];
    expect(hasBadDeactFreq(drafts)).toBeTruthy();
  });

  it('blocked when deact_uses_weekly_target true and deact_frequency null', () => {
    const drafts = [draft({ type: 'deactivation', deact_uses_weekly_target: true, deact_frequency: null })];
    expect(hasBadDeactFreq(drafts)).toBeTruthy();
  });
});
