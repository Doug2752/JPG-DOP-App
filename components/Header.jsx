import React from 'react';
import { GOLD } from '../utils/constants';
import { gbtn } from './styles';

export default function Header({
  view, goToday, setView, isToday,
  setupComplete,
  streak, firstName,
  showInstructions, onInstructions, onLogout,
}) {
  return (
    <div style={{
      background: '#111',
      borderBottom: `2px solid ${GOLD}`,
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
      height: 52,
    }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          style={gbtn({ background: view === 'form' && isToday && setupComplete ? GOLD : '#333', border: 'none' })}
          onClick={goToday}
        >Today</button>
        <button
          style={gbtn({ background: view === 'archive' ? GOLD : '#333', border: 'none' })}
          onClick={() => setView('archive')}
        >Archive</button>
        <button
          style={gbtn({ background: view === 'setup' ? GOLD : '#333', border: 'none' })}
          onClick={() => setView('setup')}
        >Configure</button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {streak > 0 && (
          <div style={{ background: GOLD, color: '#000', borderRadius: 20, padding: '3px 12px', fontSize: 11, fontWeight: 900, letterSpacing: 1 }}>
            {streak} Day Streak
          </div>
        )}
        <button
          style={{ padding: '6px 14px', borderRadius: 5, border: `1.5px solid ${GOLD}`, background: 'transparent', color: GOLD, fontSize: 11, fontWeight: 700, cursor: 'pointer', letterSpacing: 0.5, whiteSpace: 'nowrap' }}
          onClick={onInstructions}
        >{showInstructions ? 'Close Set-Up and Instructions' : 'Set-Up and Instructions'}</button>
        <span style={{ color: '#aaa', fontSize: 12 }}>{firstName}</span>
        <button
          style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer', fontSize: 12 }}
          onClick={onLogout}
        >Logout</button>
      </div>
    </div>
  );
}
