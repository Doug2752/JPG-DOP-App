export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function fmtDate(str) {
  if (!str) return '';
  const d = new Date(str + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}
