module.exports = {
    testEnvironment: "jsdom",
    preset: 'ts-jest',
    roots: [
      "./tests",
      "<rootDir>/src"
    ],
    modulePaths: [
        "<rootDir>/src"
    ],
    moduleDirectories: [
        "node_modules"
    ],
    coveragePathIgnorePatterns: [
      "/node_modules/",
      "/tests/"
    ],
    paths: {
        "*": ["node_modules/*"],
        "@assets/*": ["./assets/*"],
        "@src/*": ["./src/*"]
      },
    moduleNameMapper: {'^.+\\.(css|scss|png)$': '<rootDir>/tests/stub.js', "@src/(.*)": "<rootDir>/src/$1"},
    
  };