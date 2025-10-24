export function validateEmptyAfterTrim(str: string, field?: string) {
  return str.trim().length === 0
    ? `${field ? `${field} field` : "Field"} is required.`
    : true;
}
