export const MOCK_LOCAL_STORAGE = (function () {
  let store: { [key: string]: string } = {};

  return {
    getItem: function <T>(key: string): T | null {
      try {
        return JSON.parse(store[key]) as T;
      } catch (error: unknown) {
        return null as unknown as T;
      }
    },
    setItem: function (key: string, value: unknown): void {
      store[key] = JSON.stringify(value);
    },
    removeItem: function (key: string): void {
      delete store[key];
    },
    clear: function (): void {
      store = {};
    },
  };
})();
