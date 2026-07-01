import React, { useState } from 'react';
import { BG, GOLD } from '../utils/constants';
import { gbtn } from './styles';

const SECTIONS = [
  'Set Up / Edit',
  'Instructions',
  'History',
  'Metrics',
];

const btnStyle = {
  width: '100%',
  padding: '16px',
  borderRadius: '5px',
  background: '#1a1a1a',
  color: 'white',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  border: '1.5px solid #333',
  textAlign: 'left',
};

export default function FourX4View({ onBack }) {
  const [section, setSection] = useState(null);

  if (section) {
    return (
      <div style={{
        minHeight: '100vh',
        background: BG,
        fontFamily: 'sans-serif',
        padding: '24px 16px',
      }}>
        <div style={{
          maxWidth: 900,
          margin: '0 auto',
          background: 'white',
          borderRadius: '5px',
          padding: '24px',
        }}>
          <button
            style={gbtn({
              background: GOLD,
              border: 'none',
              marginBottom: 20,
            })}
            onClick={() => setSection(null)}
          >← Back</button>
          <div style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 18,
            fontWeight: 600,
            background: '#1a1a1a',
            borderRadius: '5px',
            padding: '40px',
          }}>
            {section}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: BG,
      fontFamily: 'sans-serif',
      padding: '24px 16px',
    }}>
      <div style={{
        maxWidth: 900,
        margin: '0 auto',
        background: 'white',
        borderRadius: '5px',
        padding: '24px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 24,
        }}>
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              color: GOLD,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              padding: 0,
              marginRight: 16,
            }}
          >← Back</button>
          <div style={{
            color: '#B8860B',
            fontSize: 22,
            fontWeight: 700,
          }}>4x4 Matrix</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SECTIONS.map(label => (
            <button
              key={label}
              style={btnStyle}
              onClick={() => setSection(label)}
            >{label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
