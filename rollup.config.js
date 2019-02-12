import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import graphql from "rollup-plugin-graphql";

let pkg = require("./package.json");
let external = Object.keys(pkg.dependencies);
let plugins = [
  graphql(),
  resolve(),
  babel(),
  commonjs(),
  terser({
    sourcemap: true
  })
];

export default [
  {
    input: "src/index.js",
    plugins,
    external,
    output: [
      {
        file: "dist/things-scene-slam.js",
        name: "things-scene-slam",
        format: "umd",
        globals: {
          "@hatiolab/things-scene": "scene"
        }
      }
    ]
  },
  {
    input: "src/index.js",
    plugins,
    external,
    output: [
      {
        file: pkg.module,
        format: "esm"
      }
    ]
  }
];
