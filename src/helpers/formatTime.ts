export const formatTime = (timeString: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    timeStyle: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(timeString));
};
