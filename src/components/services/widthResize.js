module.exports = function widthResize() {
  const boxLeft = document.createElement("div");
  const boxRight = document.createElement("div");
  const boxLeftBottom = document.createElement("div");
  const boxRightBottom = document.createElement("div");
  const setStyle = (elem, obj) => {
    const keys = Object.keys(obj);
    keys.map((e) => (elem.style[e] = obj[e]));
  };
  const bl = {
    position: "fixed",
    top: "1rem",
    left: "1rem",
    color: "#fff",
  };
  const br = {
    position: "fixed",
    top: "1rem",
    right: "1rem",
    color: "#000",
  };
  const bbl = {
    position: "fixed",
    bottom: "1rem",
    left: "1rem",
    color: "#000",
  };
  const bbr = {
    position: "fixed",
    bottom: "1rem",
    right: "1rem",
    color: "#fff",
  };
  setStyle(boxLeft, bl);
  setStyle(boxRight, br);
  setStyle(boxLeftBottom, bbl);
  setStyle(boxRightBottom, bbr);

  document.body.appendChild(boxLeft);
  document.body.appendChild(boxRight);
  document.body.appendChild(boxLeftBottom);
  document.body.appendChild(boxRightBottom);

  function setWidth(e) {
    boxLeft.textContent = window.outerWidth;
    boxRight.textContent = window.outerWidth;
    boxLeftBottom.textContent = window.outerWidth;
    boxRightBottom.textContent = window.outerWidth;
  }
  window.addEventListener("resize", repeatOften);

  function repeatOften() {
    requestAnimationFrame(setWidth);
  }
  repeatOften();
};
