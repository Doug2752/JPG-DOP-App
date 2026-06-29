import {
  AM_STANDARD, AM_COMMON, AM_CUSTOM_IDS,
  PM_STANDARD, PM_COMMON, PM_CUSTOM_IDS,
  AM_DEFAULT_RECOMMENDED, PM_DEFAULT_COMMON, PM_DEFAULT_TOP,
} from './constants';
import { todayStr } from './date';

export function defaultCustomLabels(ids) {
  const obj = {};
  ids.forEach(id => { obj[id] = ''; });
  return obj;
}

export function defaultDurations() {
  const d = {};
  [...AM_STANDARD, ...AM_COMMON].forEach(i => { d[i.id] = ''; });
  AM_CUSTOM_IDS.forEach(id => { d[id] = ''; });
  [...PM_STANDARD, ...PM_COMMON].forEach(i => { d[i.id] = ''; });
  PM_CUSTOM_IDS.forEach(id => { d[id] = ''; });
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
    amCustomLabels: defaultCustomLabels(AM_CUSTOM_IDS),
    pmCustomLabels: defaultCustomLabels(PM_CUSTOM_IDS),
    durations: defaultDurations(),
    bedtime: '9:00 PM',
    setupComplete: false,
  };
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
