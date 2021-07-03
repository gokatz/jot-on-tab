function download(url) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
  });
}