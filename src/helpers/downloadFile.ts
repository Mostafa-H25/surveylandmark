export const downloadFile = (fileName: string, fileUrl: string) => {
  const a = document.createElement("a");
  const url = import.meta.env.BASE_URL + fileUrl;
  const encodedURI = encodeURIComponent(url);
  a.setAttribute("href", encodedURI);
  a.setAttribute("download", fileName);

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
