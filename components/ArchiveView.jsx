import React from 'react';
import { GOLD, DARK, BORDER, BG } from '../utils/constants';
import { fmtDate } from '../utils/date';
import FormInstructionsModal from './FormInstructionsModal';

export default function ArchiveView({ archiveDates, loadArchive, showInstructions, onCloseInstructions }) {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '16px 16px 60px' }}>
      <div style={{ background: '#fff', borderRadius: 5, padding: '18px 20px', border: `1px solid ${BORDER}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
        <div style={{ fontWeight: 800, fontSize: 13, color: DARK, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 14 }}>
          Archive — Last 30 Days
        </div>
        {archiveDates.length === 0 ? (
          <div style={{ color: '#999', fontSize: 13 }}>No archived days yet.</div>
        ) : (
          archiveDates
            .slice()
            .sort((a, b) => a > b ? -1 : 1)
            .slice(0, 30)
            .map(d => (
              <button
                key={d}
                onClick={() => loadArchive(d)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '10px 14px', borderRadius: 6, border: `1px solid ${BORDER}`,
                  background: '#fff', marginBottom: 8, cursor: 'pointer',
                  fontSize: 13, fontWeight: 700, color: DARK,
                }}
              >
                {fmtDate(d)}
              </button>
            ))
        )}
      </div>
      {showInstructions && (
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px', boxSizing: 'border-box', width: '100%' }}>
          <FormInstructionsModal onClose={onCloseInstructions} />
        </div>
      )}
    </div>
  );
}
