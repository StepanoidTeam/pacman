export const saveData = (function() {
  const a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);
  return function(data, fileName) {
    const json = JSON.stringify(data),
      blob = new Blob([json], { type: "octet/stream" }),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;

    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();

    console.log(json);
  };
})();
