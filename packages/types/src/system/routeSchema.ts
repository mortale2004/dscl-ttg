import { schemaMetaData, validate } from "src/utils/validation";
import { InferType, object } from "yup";

export const routeSchema = object({
  module_id: validate.requiredText("Module"),
  ui_route: validate
    .text("UI Route")
    .test(
      "match",
      "Enter Any One of UI Route or API Route",
      function (ui_route) {
        return ui_route || this.parent.api_route;
      },
    ),
  api_route: validate
    .text("API Route")
    .test(
      "match",
      "Enter Any One of UI Route or API Route",
      function (api_route) {
        return api_route || this.parent.ui_route;
      },
    ),
  route_name: validate.requiredText("Route Name"),
  description: validate.text("Description"),
  ...schemaMetaData(true, true, true),
});

export type routeType = InferType<typeof routeSchema>;
