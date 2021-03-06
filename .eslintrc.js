module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "globals": {
    VERSION: false,
    IS_PRODUCTION: false,
  },
  "rules": {
    "react/jsx-uses-vars": "error",
    indent: [
      "error",
      2,
      { "SwitchCase": 1 }
    ],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "no-console": ["error", { allow: ["warn", "error"] }]
  }
};
