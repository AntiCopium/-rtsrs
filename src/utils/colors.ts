import * as mod from 'https://deno.land/x/random@v1.1.2/Random.js';

/* Array values */
export const palette = [
  '#6349be',
  '#9d58f2',
  '#f2a9f7',
  '#ab68f2',
  '#c676f4',
  '#fbcff9',
  '#9474d4',
  '#846ccc',
  '#c584f7',
];
/* String values*/
export const color1 = '#6349be';
export const color2 = '#9d58f2';
export const color3 = '#f2a9f7';
export const color4 = '#ab68f2';
export const color5 = '#c676f4';
export const color6 = '#fbcff9';
export const color7 = '#9474d4';
export const color8 = '#846ccc';
export const color9 = '#c584f7';

/**
 * Generate a random color from palette
 * @returns random color
 * @params none
 */
export function rdomcolor(): string {
  const r: string = new mod.Random().pick(palette);
  return r;
}
