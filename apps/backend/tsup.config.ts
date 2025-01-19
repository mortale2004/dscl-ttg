import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  entryPoints: ["src/**/*"],
  clean: true,
  minify: true,
  format: ["cjs"],
  ...options,
}));
