export const formatCamelCaseToText = (str: string) => {
  let updatedString = str[0];
  for (let i = 1; i < str.length; i++) {
    updatedString +=
      str.charAt(i) === str.charAt(i).toUpperCase() ? " " + str[i] : str[i];
  }
  return updatedString;
};
