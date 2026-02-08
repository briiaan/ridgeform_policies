import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route(":tab?","routes/home.tsx"), // dynamic tab route
] satisfies RouteConfig;
