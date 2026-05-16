// @utils/capitalizeHelpers.ts

/**
 * Capitalizes the first letter of a string.
 * e.g. "hello" → "Hello"
 */
export const capitalizeFirstLetter = (text: string): string =>
  text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

/**
 * Capitalizes the first letter of every word in a string.
 * e.g. "john doe" → "John Doe"
 */
export const capitalizeEachWord = (text: string): string =>
  text.replace(/\b\w/g, (char) => char.toUpperCase());
