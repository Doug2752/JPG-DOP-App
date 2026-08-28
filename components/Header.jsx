import React from 'react';
import { GOLD, DARK } from '../utils/constants';

export default function Header({
  view, goToday, setView, isToday,
  setupComplete,
  streak, firstName,
  showInstructions, onInstructions, onLogout,
}) {
  return (
    <div style={{
      background: DARK,
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span
          onClick={() => setView('setup')}
          style={view === 'setup'
            ? { color: GOLD, fontWeight: 700, fontSize: 13, cursor: 'pointer', borderBottom: '2px solid #B8860B', paddingBottom: 2 }
            : { color: 'rgba(255,255,255,0.5)', fontWeight: 500, fontSize: 13, cursor: 'pointer' }}
        >Configure</span>
        <span
          onClick={goToday}
          style={view === 'form' && isToday && setupComplete
            ? { color: GOLD, fontWeight: 700, fontSize: 13, cursor: 'pointer', borderBottom: '2px solid #B8860B', paddingBottom: 2 }
            : { color: 'rgba(255,255,255,0.5)', fontWeight: 500, fontSize: 13, cursor: 'pointer' }}
        >Today</span>
        <span
          onClick={() => setView('archive')}
          style={view === 'archive'
            ? { color: GOLD, fontWeight: 700, fontSize: 13, cursor: 'pointer', borderBottom: '2px solid #B8860B', paddingBottom: 2 }
            : { color: 'rgba(255,255,255,0.5)', fontWeight: 500, fontSize: 13, cursor: 'pointer' }}
        >Archive</span>
        {setupComplete ? (
          <span
            onClick={() => setView('4x4')}
            style={view === '4x4'
              ? { color: GOLD, fontWeight: 700, fontSize: 13, cursor: 'pointer', borderBottom: '2px solid #B8860B', paddingBottom: 2 }
              : { color: 'rgba(255,255,255,0.5)', fontWeight: 500, fontSize: 13, cursor: 'pointer' }}
          >4x4 Matrix</span>
        ) : (
          <div title="Complete DOP Configure setup to unlock 4x4.">
            <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 500, fontSize: 13, cursor: 'not-allowed' }}>4x4 Matrix</span>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 2 }}>Complete Configure to unlock</div>
          </div>
        )}
        {streak > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 1.5, height: 16, background: 'rgba(255,255,255,0.25)' }} />
            <span style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>
              {streak} Day Streak
            </span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span
          onClick={onInstructions}
          style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}
        >
          {showInstructions ? 'Close Set-Up and Instructions' : 'Set-Up and Instructions'}
        </span>
        <div style={{ width: 1.5, height: 16, background: 'rgba(255,255,255,0.25)' }} />
        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>
          {firstName}
        </span>
        <div style={{ width: 1.5, height: 16, background: 'rgba(255,255,255,0.25)' }} />
        <span
          onClick={onLogout}
          style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, cursor: 'pointer' }}
        >
          Logout
        </span>
      </div>
    </div>
  );
}
