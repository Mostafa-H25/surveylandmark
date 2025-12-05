export const downloadFile = (fileName: string, fileUrl: string) => {
  const a = document.createElement("a");
  const url = import.meta.env.VITE_BASE_URL + fileUrl;
  a.setAttribute("href", url);
  a.setAttribute("download", fileName);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
