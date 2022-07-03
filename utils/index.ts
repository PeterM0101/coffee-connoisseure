export const isEmpty = (obj: Object): boolean => {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
};
