import { type JestConfigWithTsJest, createDefaultPreset } from "ts-jest";

const defaultPreset = createDefaultPreset();

const jestConfig: JestConfigWithTsJest = {
  ...defaultPreset,
  testMatch: ["<rootDir>/src/**/*.test.[jt]s?(x)"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/tsc-out/",
  ],
};

export default jestConfig;
