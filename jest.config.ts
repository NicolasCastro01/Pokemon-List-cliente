import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  preset: "ts-jest",
  collectCoverage: true,
  collectCoverageFrom: [
    'src/@core/application/usecase/**/*.{ts,tsx}',
    'src/@core/presentation/pages/**/*.{ts,tsx}',
    '!src/@core/application/usecase/**/index.{ts,tsx}',
    '!src/@core/presentation/pages/**/index.{ts,tsx}'
  ]
};

export default createJestConfig(config);