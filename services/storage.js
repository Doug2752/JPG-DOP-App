function safeParse(v) {
  try { return JSON.parse(v); } catch (_) { return v; }
}

export const storage = {
  get: (k) => {
    try {
      const v = localStorage.getItem(k);
      return Promise.resolve(v !== null ? { key: k, value: v } : null);
    } catch (e) {
      return Promise.resolve(null);
    }
  },
  set: (k, v) => {
    try {
      localStorage.setItem(k, v);
      return Promise.resolve({ key: k, value: v });
    } catch (e) {
      return Promise.reject(e);
    }
  },
  delete: (k) => {
    try {
      localStorage.removeItem(k);
      return Promise.resolve({ key: k, deleted: true });
    } catch (e) {
      return Promise.reject(e);
    }
  },
  list: (prefix) => {
    try {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!prefix || k.startsWith(prefix)) keys.push(k);
      }
      return Promise.resolve({ keys });
    } catch (e) {
      return Promise.resolve({ keys: [] });
    }
  },
};
