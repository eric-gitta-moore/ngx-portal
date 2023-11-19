/**
 * @type {import('@types/lint-staged').Config}
 */
module.exports = {
  '*.{vue,js,ts,jsx,tsx,vue}': ['eslint', 'prettier -c'],
};
