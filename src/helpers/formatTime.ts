export const formatTime = (timeString: string) => {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    timeStyle: "short",
    hour12: true,
  }).format(new Date(timeString));
};
