export const toBool = (val?: string, def = false): boolean => {
  if (val === undefined) return def;
  return ['true', '1', 'yes'].includes(val.toLowerCase());
};
  
export const toInt = (val?: string, context = 'value'): number => {
  const parsed = parseInt(val ?? '', 10);
  if (isNaN(parsed)) {
    throw new Error(`Invalid integer for ${context}: "${val}"`);
  }
  return parsed;
};
  
  