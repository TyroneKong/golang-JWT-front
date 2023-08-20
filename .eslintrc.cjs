module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "prettier",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier"],
  ignorePatterns: [
    ".eslintrc.js",
    "postcss.config.js",
    "tailwindcss.config.js",
    "vite.config.ts",
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "react/button-has-type": "off",
    "react/jsx-props-no-spreading": "off",
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_|props",
        varsIgnorePattern: "^_",
      },
    ],
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "jsx-a11y/label-has-for": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
  },
  overrides: [
    {
      files: ["src/**/*"],
      rules: {
        "react/prop-types": "off",
      },
    },
  ],
  settings: {
    "import/resolver": {
      alias: {
        map: [["@src", "./src/components"]],
        extensions: [".ts", ".js", ".tsx", ".json"],
      },
    },
  },
};
