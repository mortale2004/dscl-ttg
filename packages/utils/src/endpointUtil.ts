export const getEndPoint = (route: any, method: any) => {
  return typeof route === "string" ? route : route[method];
};
