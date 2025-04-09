module.exports = {
  '*.{js,jsx}': ['eslint --fix'],
  '*.{ts,tsx}': [() => 'tsc -b --noEmit', 'eslint --cache --fix'],
}
