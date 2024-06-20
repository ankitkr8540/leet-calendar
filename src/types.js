/**
 * @typedef {Object} Activity
 * @property {string} date
 * @property {number} count
 * @property {0|1|2|3|4} level
 */

/**
 * @typedef {number|string} Year
 */

/**
 * @typedef {Object} ApiResponse
 * @property {Activity[]} contributions
 * @property {Object} total
 * @property {number} total.lastYear
 */

/**
 * @typedef {Object} ApiErrorResponse
 * @property {string} error
 */

/**
 * @typedef {string} Color
 */

/**
 * @typedef {[Color, Color, Color, Color, Color]} ColorScale
 */

/**
 * @typedef {Object} ThemeInput
 * @property {ColorScale|Object} light
 * @property {ColorScale|Object} dark
 */
