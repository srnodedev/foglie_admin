export const Routing = {
  generateCreateRoute: (route: string): string => {
    return `${route}/create`;
  },
  generateEditRoute: (route: string, id = ":id"): string => {
    return `${route}/${id}/edit`;
  },
  generateDetailRoute: (route: string, id = ":id"): string => {
    return `${route}/${id}`;
  },
  generateChildCreateRoute: (baseRoute: string, baseId = ":baseId", route: string): string => {
    return `${baseRoute}/${baseId}${route}/create`;
  },
  generateChildEditRoute: (baseRoute: string, baseId = ":baseId", route: string, id = ":id"): string => {
    return `${baseRoute}/${baseId}${route}/${id}/edit`;
  },
};
