"use client";

export const setLCItem = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLCItem = (key: string, isExpired?: boolean) => {
  if (typeof window !== "undefined") {
    try {
      const item = localStorage.getItem(key);
      if (isExpired && item) {
        const itemDate = new Date(item);
        if (itemDate < new Date()) {
          localStorage.removeItem(key);
          return null;
        }
      }
      return item ? JSON.parse(item) : null;
    } catch (error) {
      return null;
    }
  }
};
