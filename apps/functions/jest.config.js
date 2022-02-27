module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  jest: {
    verbose: true,
  },
  setupFile: ["./jest.setup.ts"],
};
