type ColorTextFn = (text: string) => string;

export const isColorAllowed = () => {
  // Browser-compatible color detection
  if (typeof process !== 'undefined' && process.env) {
    return !process.env.NO_COLOR;
  }
  // In browser, check for development mode or allow colors by default
  return typeof window !== 'undefined';
};
const colorIfAllowed = (colorFn: ColorTextFn) => (text: string) =>
  isColorAllowed() ? colorFn(text) : text;

export const clc = {
  bold: colorIfAllowed((text: string) => `\x1B[1m${text}\x1B[0m`),
  green: colorIfAllowed((text: string) => `\x1B[32m${text}\x1B[39m`),
  yellow: colorIfAllowed((text: string) => `\x1B[33m${text}\x1B[39m`),
  red: colorIfAllowed((text: string) => `\x1B[31m${text}\x1B[39m`),
  magentaBright: colorIfAllowed((text: string) => `\x1B[95m${text}\x1B[39m`),
  cyanBright: colorIfAllowed((text: string) => `\x1B[96m${text}\x1B[39m`),
};
export const yellow = colorIfAllowed(
  (text: string) => `\x1B[38;5;3m${text}\x1B[39m`
);
