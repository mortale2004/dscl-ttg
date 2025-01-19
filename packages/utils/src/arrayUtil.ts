export const buildHierarchy = (
  data: any[] = [],
  _id: string = "_id",
  parent_id: string = "parent_id",
) => {
  const map: any = {};
  const roots: any[] = [];

  // Initialize map with each item as a key
  data.forEach((item) => {
    map[item[_id]] = { ...item, children: [] };
  });

  // Build the hierarchy
  data.forEach((item) => {
    if (item[parent_id]) {
      if (map[item[parent_id]]) {
        map[item[parent_id]].children.push(map[item[_id]]);
      }
    } else {
      roots.push(map[item[_id]]);
    }
  });

  return roots;
};
