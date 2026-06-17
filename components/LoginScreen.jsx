import React, { useState } from 'react';
import { GOLD, DARK, BORDER } from '../utils/constants';
import { USERS } from '../utils/constants';
import { inp, gbtn } from './styles';

const LOGO_SRC = '/jpglogo.png';

export default function LoginScreen({ onLogin }) {
  const [sel, setSel] = useState('Doug');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');

  const attempt = () => {
    const u = USERS[sel];
    if (!u || pass !== u.password) { setErr('Invalid password.'); return; }
    setErr('');
    onLogin(sel, u.firstName);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: `radial-gradient(ellipse at center, #2a2a2a 0%, #111 100%)`,
      fontFamily: 'sans-serif', padding: 20,
    }}>
      <div style={{ width: '100%', maxWidth: 380, textAlign: 'center' }}>
        <img src={LOGO_SRC} alt="Jones Performance Group" style={{ width: 260, marginBottom: 32 }} />

        <div style={{
          background: '#fff', borderRadius: 12, padding: '32px 28px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
        }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: DARK, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 4 }}>
            DOP
          </div>
          <div style={{ fontSize: 11, color: '#888', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28 }}>
            Daily Operational Process
          </div>

          <div style={{ textAlign: 'left', marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 5 }}>
              User
            </label>
            <select
              value={sel}
              onChange={e => setSel(e.target.value)}
              style={{ ...inp, cursor: 'pointer', height: 34 }}
            >
              {Object.keys(USERS).map(k => (
                <option key={k} value={k}>{USERS[k].firstName}</option>
              ))}
            </select>
          </div>

          <div style={{ textAlign: 'left', marginBottom: 20 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 5 }}>
              Password
            </label>
            <input
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && attempt()}
              style={inp}
              placeholder="Enter password..."
              autoFocus
            />
          </div>

          {err && (
            <div style={{ color: '#c0392b', fontSize: 12, fontWeight: 600, marginBottom: 12 }}>{err}</div>
          )}

          <button onClick={attempt} style={gbtn({ width: '100%', padding: '11px', fontSize: 13 })}>
            Enter DOP
          </button>

          <div style={{ marginTop: 16, fontSize: 10, color: '#bbb' }}>
            Doug: jpg2026 · Test: test123
          </div>
        </div>

        <div style={{ marginTop: 20, fontSize: 9, color: '#555', letterSpacing: 2, textTransform: 'uppercase' }}>
          Jones Performance Group LLC — Confidential
        </div>
      </div>
    </div>
  );
}
