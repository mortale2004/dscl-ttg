import { RouterConfigData } from "@dscl-ttg/types/app";

export const isUrlInChildren = (parent: RouterConfigData, path: string) => {
  if (!parent.children) {
    return parent.path?.includes(path) || false;
  }

  for (let i = 0; i < parent.children.length; i++) {
    if (parent.children[i].children) {
      if (isUrlInChildren(parent.children[i], path)) {
        return true;
      }
    }

    if (parent.children[i]?.path?.includes(path)) {
      return true;
    }
  }

  return false;
};
