const config = {
  input: "tsc-out/main.js",
  output: {
    file: "dist/script.js",
    format: "iife",
    globals: { p5: "p5" },
    interop: "default",
  },
  external: ["p5"],
};

export default config;
