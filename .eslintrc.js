module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
    ],
    parserOptions: {
        ecmaVersion: 2018,
        project: ["./tsconfig.json"],
        // tsconfig 파일의 경로를 참조
        // 기준은 root
    },
    rules: {
        // 추가하고 싶은 rule을 더 추가
    }
};