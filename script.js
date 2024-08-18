let opts = {
  brushColor: "#ffffff",
  brushSize: parseInt(size.value)
};

const dt = new DrawingTablet("#canvas-container", {
  logs: true,
  fullscreen: true,
  brushSize: opts.brushSize,
  bg: "#181818",
  color: opts.brushColor,
  autosave: true
});

dt.log("Drawing Tablet Initialized");

const dcs = document.querySelectorAll(".dt-default-colors");
const dcp = document.querySelectorAll(".dt-cp-container");

dcs.forEach((e) => {
  e.children[ 0 ].style.background = e.dataset.color;
  selectColor();
  e.addEventListener("click", () => {
    dt.brushColor = e.dataset.color;
    opts.brushColor = e.dataset.color;
    selectColor();
  });
});
function selectColor() {
  dcs.forEach((el) => {
    el.style.border = `2px solid  ${opts.brushColor === el.dataset.color
        ? el.dataset.color
        : "transparent"
      }`;
  });
}
dtPicker.addEventListener("input", (e) => {
  dt.brushColor = e.target.value;
  selectColor();
});
download.addEventListener("click", () => {
  dt.download();
});
undo.addEventListener("click", () => {
  dt.undo();
});
redo.addEventListener("click", () => {
  dt.redo();
});
clear.addEventListener("click", () => {
  const b = confirm("Are you sure to clear?");
  if (b) {
    dt.clear();
  }
});

size.addEventListener("input", (e) => {
  dt.brushSize = parseInt(e.target.value);
});

pencil.addEventListener("click", () => {
  dt.pencil();
  dt.brushSize = parseInt(size.value);
  dt.brushColor = opts.brushColor;
  isSelected();
});

highlighter.addEventListener("click", () => {
  dt.highlighter();
  dt.brushColor = opts.brushColor;
  isSelected();
});

eraser.addEventListener("click", () => {
  dt.eraser();
  isSelected();
});

function isSelected() {
  if (dt.brushType === type.pencil) {
    document.querySelector("#pencil").style.bottom = "-10px";
    document.querySelector("#highlighter").style.bottom = "-25px";
    document.querySelector("#eraser").style.bottom = "-25px";
  } else if (dt.brushType === type.eraser) {
    document.querySelector("#pencil").style.bottom = "-25px";
    document.querySelector("#highlighter").style.bottom = "-25px";
    document.querySelector("#eraser").style.bottom = "-10px";
  } else if (dt.brushType === type.highlighter) {
    document.querySelector("#highlighter").style.bottom = "-10px";
    document.querySelector("#pencil").style.bottom = "-25px";
    document.querySelector("#eraser").style.bottom = "-25px";
  }
}
isSelected();
