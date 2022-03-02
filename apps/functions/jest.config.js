module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["./jest.setup.ts"],
  rootDir: "./src",
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
