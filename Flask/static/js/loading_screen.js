function alertTimeout(mymsg, mymsecs) {
  var myelement = document.createElement("div");
  myelement.setAttribute(
    "style",
    "background-color: grey;color:black; width: 450px;height: 200px;position: absolute;top:0;bottom:0;left:0;right:0;margin:auto;border: 4px solid black;font-family:arial;font-size:25px;font-weight:bold;display: flex; align-items: center; justify-content: center; text-align: center;"
  );
  myelement.innerHTML = mymsg;
  setTimeout(function () {
    myelement.parentNode.removeChild(myelement);
  }, mymsecs);
  document.body.appendChild(myelement);
}

// alertTimeout("Splash 1.0<br>This is a splash screen<br>Page is loading!",5000)
