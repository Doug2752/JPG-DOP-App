import { BORDER, MID, DARK, GOLD } from '../utils/constants';

export const inp = {
  width: '100%',
  padding: '7px 10px',
  borderRadius: 5,
  border: `1px solid ${BORDER}`,
  fontSize: 13,
  fontFamily: 'sans-serif',
  boxSizing: 'border-box',
  background: '#fff',
};

export const lbl = {
  fontSize: 11,
  fontWeight: 700,
  color: MID,
  textTransform: 'uppercase',
  letterSpacing: 1,
  marginBottom: 4,
  display: 'block',
};

export const card = {
  background: '#fff',
  borderRadius: 8,
  border: `1px solid ${BORDER}`,
  overflow: 'hidden',
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  marginBottom: 14,
};

export const gbtn = (extra = {}) => ({
  padding: '8px 18px',
  borderRadius: 5,
  border: 'none',
  cursor: 'pointer',
  fontSize: 12,
  fontWeight: 700,
  background: GOLD,
  color: '#fff',
  letterSpacing: 0.5,
  whiteSpace: 'nowrap',
  ...extra,
});
