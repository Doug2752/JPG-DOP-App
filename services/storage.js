function getStore() {
  if (typeof window !== 'undefined' && window.storage && typeof window.storage.get === 'function') {
    return window.storage;
  }
  const mem = {};
  return {
    get: k => Promise.resolve(mem[k] !== undefined ? { key: k, value: mem[k] } : null),
    set: (k, v) => { mem[k] = v; return Promise.resolve({ key: k, value: v }); },
    delete: k => { delete mem[k]; return Promise.resolve({ key: k, deleted: true }); },
    list: p => {
      const ks = Object.keys(mem).filter(k => !p || k.startsWith(p));
      return Promise.resolve({ keys: ks });
    },
  };
}

export const storage = getStore();
