import {
  AM_STANDARD, AM_COMMON,
  PM_STANDARD, PM_COMMON,
  AM_DEFAULT_RECOMMENDED, PM_DEFAULT_COMMON, PM_DEFAULT_TOP,
} from './constants';
import { todayStr } from './date';

export function defaultDurations() {
  const d = {};
  [...AM_STANDARD, ...AM_COMMON].forEach(i => { d[i.id] = ''; });
  [...PM_STANDARD, ...PM_COMMON].forEach(i => { d[i.id] = ''; });
  return d;
}

export function defaultSetup() {
  return {
    amSelected: AM_STANDARD.map(i => i.id),
    amCommonSelected: AM_DEFAULT_RECOMMENDED.slice(),
    amOrder: ['pit', ...AM_DEFAULT_RECOMMENDED],
    pmSelected: PM_STANDARD.map(i => i.id),
    pmCommonSelected: PM_DEFAULT_COMMON.slice(),
    pmOrder: [...PM_DEFAULT_TOP, ...PM_DEFAULT_COMMON],
    amCustomItems: [{ id: 'am_c_0', label: '' }],
    pmCustomItems: [{ id: 'pm_c_0', label: '' }],
    durations: defaultDurations(),
    bedtime: '9:00 PM',
    setupComplete: false,
  };
}

const OLD_AM_IDS = ['am_c1', 'am_c2', 'am_c3', 'am_c4', 'am_c5'];
const OLD_PM_IDS = ['pm_c1', 'pm_c2', 'pm_c3', 'pm_c4', 'pm_c5'];

export function migrateSetup(saved) {
  if (saved.amCustomItems && saved.pmCustomItems) return saved;

  const oldAMLabels = saved.amCustomLabels || {};
  const amItems = [];
  let ai = 0;
  OLD_AM_IDS.forEach(oldId => {
    const label = (oldAMLabels[oldId] || '').trim();
    if (label) amItems.push({ id: 'am_c_' + ai++, label });
  });
  if (amItems.length === 0) amItems.push({ id: 'am_c_0', label: '' });

  const oldPMLabels = saved.pmCustomLabels || {};
  const pmItems = [];
  let pi = 0;
  OLD_PM_IDS.forEach(oldId => {
    const label = (oldPMLabels[oldId] || '').trim();
    if (label) pmItems.push({ id: 'pm_c_' + pi++, label });
  });
  if (pmItems.length === 0) pmItems.push({ id: 'pm_c_0', label: '' });

  const amOrder = (saved.amOrder || []).filter(id => !OLD_AM_IDS.includes(id));
  amItems.filter(i => i.label).forEach(i => { if (!amOrder.includes(i.id)) amOrder.push(i.id); });

  const pmOrder = (saved.pmOrder || []).filter(id => !OLD_PM_IDS.includes(id));
  pmItems.filter(i => i.label).forEach(i => { if (!pmOrder.includes(i.id)) pmOrder.push(i.id); });

  return { ...saved, amCustomItems: amItems, pmCustomItems: pmItems, amOrder, pmOrder };
}

export function emptyForm(date) {
  return {
    date: date || todayStr(),
    morningEval: null,
    eveningEval: null,
    amChecks: {},
    pmChecks: {},
    pmGood: '',
    pmBad: '',
    amDeviation: '',
    pmDeviation: '',
    tomorrowOneThing: '',
    tomorrowAppts: '',
    neverTwiceRead: false,
  };
}

export function isDayComplete(form) {
  if (!form) return false;
  if (form.morningEval === null || form.eveningEval === null) return false;
  const amChecked = form.amChecks && Object.values(form.amChecks).some(v => v);
  if (!amChecked) return false;
  const pmChecked = form.pmChecks && Object.values(form.pmChecks).some(v => v);
  const pmTextFilled = (form.pmGood && form.pmGood.trim().length > 0) || (form.pmBad && form.pmBad.trim().length > 0);
  return !!(pmChecked || pmTextFilled);
}

export function getDailyQuote(quotes) {
  const day = Math.floor(Date.now() / 86400000);
  return quotes[day % quotes.length];
}
