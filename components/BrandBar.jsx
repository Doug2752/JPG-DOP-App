import React from 'react';
import { GOLD, DARK, BORDER } from '../utils/constants';
import { inp, gbtn } from './styles';
import { todayStr, fmtDate, fmtDateShort } from '../utils/date';

const LOGO_SRC = '/jpglogo.png';

export default function BrandBar({ form, upd, showDatePicker, setShowDatePicker, goToday, loadArchive, readOnlyDate }) {
  return (
    <div
      style={{ background: '#fff', borderBottom: `2px solid ${GOLD}`, padding: '10px 20px' }}
      onClick={() => setShowDatePicker(false)}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* LEFT — Logo */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <img src={LOGO_SRC} alt="Jones Performance Group" style={{ width: 260, height: 'auto', display: 'block' }} />
        </div>

        {/* CENTER — DOP title and subtitle only */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 52, fontWeight: 900, color: '#000', lineHeight: 1 }}>DOP</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#000', letterSpacing: 0.5, marginTop: 3 }}>
            Daily Operational Process
          </div>
        </div>

        {/* RIGHT — Date picker only */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
          {readOnlyDate !== undefined ? (
            <div style={{ marginBottom: 10, fontSize: 12, fontWeight: 600, color: '#555' }}>
              {readOnlyDate
                ? <>Last updated on <span style={{ color: DARK, fontWeight: 700 }}>{fmtDate(readOnlyDate.slice(0, 10))}</span></>
                : <span style={{ color: '#aaa', fontStyle: 'italic' }}>Not yet saved</span>
              }
            </div>
          ) : (
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: 10 }} onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setShowDatePicker(p => !p)}
                style={{ background: '#fff', border: `1px solid ${GOLD}`, borderRadius: 5, padding: '4px 14px', fontSize: 12, fontWeight: 600, color: DARK, cursor: 'pointer', letterSpacing: 0.3 }}
              >
                {fmtDateShort(form.date)}
                <span style={{ marginLeft: 8, fontSize: 16, color: GOLD, lineHeight: 1 }}>▾</span>
              </button>

              {showDatePicker && (
                <div style={{ position: 'absolute', top: '110%', left: '50%', transform: 'translateX(-50%)', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', padding: 12, zIndex: 200, minWidth: 260 }}>
                  <input
                    type="date"
                    value={form.date}
                    max={todayStr()}
                    onChange={e => {
                      const newDate = e.target.value;
                      if (!newDate) return;
                      setShowDatePicker(false);
                      if (newDate === todayStr()) goToday(); else loadArchive(newDate);
                    }}
                    style={{ ...inp, marginBottom: 8, textAlign: 'center', fontSize: 13 }}
                  />
                  <button
                    onClick={() => { goToday(); setShowDatePicker(false); }}
                    style={gbtn({ width: '100%', padding: '7px', fontSize: 12 })}
                  >Today</button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
