import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(
	readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);

export default {
	input: "src/index.ts",
	output: [
		{
			file: pkg.main,
			format: "cjs",
			sourcemap: true,
		},
		{
			file: pkg.module,
			format: "esm",
			sourcemap: true,
		},
	],
	plugins: [
		resolve(),
		commonjs(),
		typescript({
			tsconfig: "./tsconfig.json",
		}),
		terser(),
	],
	external: ["react", "react-dom"],
};
