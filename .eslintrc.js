module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
    ],
    parserOptions: {
        "ecmaFeatures": {
            "jsx": true
        },
        "parser": "babel-eslint",
        "sourceType": "module",
        "allowImportExportEverywhere": true,
        "ecmaVersion": 2018
    },
    plugins: ["react"],
    rules: {
        "react/prop-types": "off",
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "block-spacing": ["error", "always"],
        "import/no-named-as-default": 0
        // 추가하고 싶은 rule을 더 추가
    }
};