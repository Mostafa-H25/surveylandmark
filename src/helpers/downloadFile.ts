export const downloadReport = (fileName: string, reportUrl: string) => {
  const a = document.createElement("a");
  const url = import.meta.env.BASE_URL + reportUrl;
  const encodedURI = encodeURIComponent(url);
  a.setAttribute("href", encodedURI);
  a.setAttribute("download", fileName);

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
