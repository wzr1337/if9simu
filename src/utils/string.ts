/**
 * This function converts SNAKE_CASE strings to lowerCamelCase
 *
 * @export
 * @param {string} SNAKE_CASE the input string
 * @returns {string} lowerCamelCase of input
 */
export function convertoCamelCase(SNAKE_CASE: string): string {
  if (SNAKE_CASE.match(/_\w/g) !== null) {
    return SNAKE_CASE.toLowerCase().replace(/_\w/g, (m) => m[1].toUpperCase());
  }
  return SNAKE_CASE;
}
