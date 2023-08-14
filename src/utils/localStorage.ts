export const getLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);

  if (!data) {
    return null;
  }

  return JSON.parse(data);
};

export const setLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};
