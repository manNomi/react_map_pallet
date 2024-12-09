import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import importCss from "rollup-plugin-import-css";

export default {
  input: "src/index.jsx",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
    },
  ],
  plugins: [
    resolve({
      extensions: [".js", ".jsx"], // 확장자 처리
    }),
    commonjs(),
    importCss(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
      presets: ["@babel/preset-env", "@babel/preset-react"],
    }),
  ],
  external: ["react", "react-dom"],
};
