// .eslintrc.js

module.exports = {
    env:{
      node: true,
    },
    parserOptions:{
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    ignorePatterns: ["package*", ".npmrc", "*.md", ".*", "__tests__"],
    extends: [
      "eslint:recommended",
      "airbnb-base",
      "prettier"
    ],
    rules:{
      "import/extensions": "off",
      "class-methods-use-this" : "off",
    }
};
