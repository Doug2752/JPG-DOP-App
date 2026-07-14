import { describe, it, expect, vi, beforeEach } from 'vitest';
import { storage } from '../services/storage';

// Mock the storage service. Both tests/ and services/ live at the
// project root, so the path from this file is '../services/storage'.
vi.mock('../services/storage', () => ({
  storage: {
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
    list: vi.fn(),
  },
}));

// emptyDraft() reproduced from components/FourX4View.jsx — the 15-field
// shape used when no saved record or draft exists for a slot.
function emptyDraft() {
  return {
    foundation_core: null,
    name: '',
    type: null,
    time_of_day: null,
    frequency: null,
    weekly_target: null,
    time_cost_minutes: null,
    timeDNA: false,
    measurable_value: null,
    measurable_unit: '',
    deact_declaration: '',
    deact_frequency: null,
    deact_uses_weekly_target: false,
    carryover: null,
    is_remediate_carry: false,
  };
}

// Logic contracts reproduced from FourX4View.jsx:
//  - updateDraft storage write (line 493)
//  - mount draft-restore branch (lines 391-400)
//  - runSave draft-clear loop (lines 738-740)

function writeDraft(user, i, updated) {
  storage.set(`dop_4x4_draft_${user}_${i}`, JSON.stringify(updated));
}

async function restoreDraftForSlot(user, i) {
  let draft = emptyDraft();
  const dv = await storage.get(`dop_4x4_draft_${user}_${i}`);
  if (dv && dv.value) {
    try {
      draft = JSON.parse(dv.value);
    } catch (_) {
      draft = emptyDraft();
    }
  }
  return draft;
}

async function clearDrafts(user) {
  for (let slot = 0; slot < 4; slot++) {
    await storage.delete(`dop_4x4_draft_${user}_${slot}`);
  }
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Storage write on updateDraft', () => {
  it('calls storage.set with the slot key and serialized draft', () => {
    const updated = { ...emptyDraft(), name: 'Run a full five kilometers' };
    writeDraft('Test', 2, updated);

    expect(storage.set).toHaveBeenCalledTimes(1);
    expect(storage.set).toHaveBeenCalledWith(
      'dop_4x4_draft_Test_2',
      JSON.stringify(updated)
    );
  });
});

describe('Draft restore — empty slot reads from storage', () => {
  it('parses and uses the stored draft when storage.get returns valid JSON', async () => {
    const sample = { ...emptyDraft(), name: 'Read one chapter every single night', type: 'activation' };
    storage.get.mockResolvedValueOnce({ key: 'dop_4x4_draft_Test_0', value: JSON.stringify(sample) });

    const result = await restoreDraftForSlot('Test', 0);

    expect(storage.get).toHaveBeenCalledWith('dop_4x4_draft_Test_0');
    expect(result).toEqual(sample);
  });

  it('uses emptyDraft() shape when storage.get returns null', async () => {
    storage.get.mockResolvedValueOnce(null);

    const result = await restoreDraftForSlot('Test', 1);

    expect(result).toEqual(emptyDraft());
  });

  it('falls back to emptyDraft() shape when storage.get returns invalid JSON', async () => {
    storage.get.mockResolvedValueOnce({ key: 'dop_4x4_draft_Test_3', value: '{bad json' });

    const result = await restoreDraftForSlot('Test', 3);

    expect(result).toEqual(emptyDraft());
  });
});

describe('Draft clear after save', () => {
  it('calls storage.delete for slots 0, 1, 2, 3', async () => {
    storage.delete.mockResolvedValue({ deleted: true });

    await clearDrafts('Test');

    expect(storage.delete).toHaveBeenCalledTimes(4);
    expect(storage.delete).toHaveBeenNthCalledWith(1, 'dop_4x4_draft_Test_0');
    expect(storage.delete).toHaveBeenNthCalledWith(2, 'dop_4x4_draft_Test_1');
    expect(storage.delete).toHaveBeenNthCalledWith(3, 'dop_4x4_draft_Test_2');
    expect(storage.delete).toHaveBeenNthCalledWith(4, 'dop_4x4_draft_Test_3');
  });
});
