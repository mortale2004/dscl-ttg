export const isJsonString = (string: string): boolean => {
  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }
  return true;
};

export const getUserAvatar = (firstName: string, lastName: string) => {
  return (
    String(firstName).charAt(0).toUpperCase() +
    String(lastName).charAt(0).toUpperCase()
  );
};

export const replaceTheRegex = (content:string, regex:RegExp, replacement:string) => {
    return String(content).replace(regex, replacement);
  };
