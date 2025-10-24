import { phonePattern } from "@/constants/regex";

export function formatPhoneNumber(phone: string) {
  const isValidPhoneNumber = phonePattern.test(phone);

  if (!isValidPhoneNumber) return phone;

  return "(+20) " + phone.slice(-10, -6) + "-" + phone.slice(-6);
}
