module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb"
  ],
  "plugins": [
    "react",
    "jsx-a11y",
    "jest",
    "import"
  ],
  "rules": {
    "import/imports-first": [
      "error",
      {
        "absolute-first": false
      }
    ],
    "import/named": "error",
    "import/default": "error",
    "import/namespace": "error",
    "import/newline-after-import": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-named-as-default": "off",
    "import/no-unresolved": "error",
    "import/prefer-default-export": "off",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/heading-has-content": "off",
    "jsx-a11y/label-has-for": "error",
    "jsx-a11y/mouse-events-have-key-events": "error",
    "jsx-a11y/role-has-required-aria-props": "error",
    "jsx-a11y/role-supports-aria-props": "error",
    "no-console": "warn",
    "no-use-before-define": "off",
    "prefer-template": "error",
    "react/jsx-filename-extension": "off",
    "react/jsx-no-target-blank": "off",
    "react/jsx-wrap-multilines": "off",
    "react/require-extension": "off",
    "react/self-closing-comp": "off",
    "react/sort-comp": "off",
    "react/no-unused-prop-types": "warn",
    "react/no-unused-state": "warn",
    "require-yield": "off",
    "func-names": [
      "error",
      "as-needed"
    ],
    "no-underscore-dangle": 0,
  }
};
