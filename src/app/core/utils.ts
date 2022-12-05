export const fixAmount = (a?: string | number, precision = 2): number =>
  a ? parseFloat(parseFloat(a.toString()).toFixed(precision)) : 0;
