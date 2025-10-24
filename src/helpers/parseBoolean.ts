export function parseBoolean(str: string | null) {
  if (typeof str !== "string") return false;
  if (str.toLowerCase() === "true") return true;
  if (str.toLowerCase() === "false") return false;
  return false;
}
