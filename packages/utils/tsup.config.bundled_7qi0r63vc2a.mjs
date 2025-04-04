// tsup.config.ts
import { defineConfig } from "tsup";
var tsup_config_default = defineConfig((options) => ({
  entryPoints: ["src/index.ts"],
  clean: true,
  dts: true,
  format: ["cjs", "esm"],
  // This is important - we need both formats
  ...options
}));
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL2hvbWUvcGF2YW4vbmV0aXplbnMvcGFja2FnZXMvZXhhbXBsZS90c3VwLmNvbmZpZy50c1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCIvaG9tZS9wYXZhbi9uZXRpemVucy9wYWNrYWdlcy9leGFtcGxlXCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9ob21lL3BhdmFuL25ldGl6ZW5zL3BhY2thZ2VzL2V4YW1wbGUvdHN1cC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIHR5cGUgT3B0aW9ucyB9IGZyb20gXCJ0c3VwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygob3B0aW9uczogT3B0aW9ucykgPT4gKHtcbiAgZW50cnlQb2ludHM6IFtcInNyYy9pbmRleC50c1wiXSxcbiAgY2xlYW46IHRydWUsXG4gIGR0czogdHJ1ZSxcbiAgZm9ybWF0OiBbXCJjanNcIiwgXCJlc21cIl0sIC8vIFRoaXMgaXMgaW1wb3J0YW50IC0gd2UgbmVlZCBib3RoIGZvcm1hdHNcbiAgLi4ub3B0aW9ucyxcbn0pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlAsU0FBUyxvQkFBa0M7QUFFeFMsSUFBTyxzQkFBUSxhQUFhLENBQUMsYUFBc0I7QUFBQSxFQUNqRCxhQUFhLENBQUMsY0FBYztBQUFBLEVBQzVCLE9BQU87QUFBQSxFQUNQLEtBQUs7QUFBQSxFQUNMLFFBQVEsQ0FBQyxPQUFPLEtBQUs7QUFBQTtBQUFBLEVBQ3JCLEdBQUc7QUFDTCxFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
