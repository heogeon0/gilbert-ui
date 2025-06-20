module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['fix', 'feat', 'chore', 'style', 'init']],
    'subject-case': [0],
  },
}
