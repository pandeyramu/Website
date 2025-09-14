let boxes = document.querySelectorAll(".content");
let resetBtn = document.querySelector("#reset");
let turnA = true;
let messageB = document.querySelector(".msgB");
let mes = document.querySelector("#message");
let Win = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 4, 8], [2, 4, 6], [1, 4, 7],
  [0, 3, 6], [2, 5, 8]
];
let computerMove = () => {
  let emptyBoxes = Array.from(boxes).filter(box => box.innerHTML === "");
  if (emptyBoxes.length === 0) return;
  for (let pattern of Win) {
    let values = pattern.map(i => boxes[i].innerHTML);
    if (values.filter(v => v === "X").length === 2 && values.includes("")) {
      let index = pattern[values.indexOf("")];
      markBox(boxes[index], "X");
      return;
    }
  }
  for (let pattern of Win) {
    let values = pattern.map(i => boxes[i].innerHTML);
    if (values.filter(v => v === "0").length === 2 && values.includes("")) {
      let index = pattern[values.indexOf("")];
      markBox(boxes[index], "X");
      return;
    }
  }
  let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
  markBox(emptyBoxes[randomIndex], "X");
};
function markBox(box, symbol) {
  box.innerHTML = symbol;
  box.disabled = true;
  box.classList.add("inactive");
  checkwinner();
  turnA = true;
}
function disableAll() {
  boxes.forEach(b => {
    b.disabled = true;
    b.classList.add("inactive");
  });
}

function enableEmpty() {
  boxes.forEach(b => {
    if (b.innerHTML === "" && messageB.classList.contains("hide")) {
      b.disabled = false;
      b.classList.remove("inactive");
    }
  });
}
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerHTML === "" && messageB.classList.contains("hide") && turnA) {
      markBox(box, "0");
      turnA = false;

      if (!Array.from(boxes).every(b => b.innerHTML !== "") && messageB.classList.contains("hide")) {
        disableAll();
        setTimeout(() => {
          computerMove();
          enableEmpty();
        }, 700);
      }
    }
  });
});
const showWinner = (winner) => {
  mes.innerHTML = `Congratulations, Winner is ${winner}`;
  messageB.classList.remove("hide");
  disableAll();
};

const draw = () => {
  mes.innerHTML = "It's a draw!";
  messageB.classList.remove("hide");
  disableAll();
};

const resetF = () => {
  turnA = true;
  boxes.forEach(box => {
    box.innerHTML = "";
    box.disabled = false;
    box.classList.remove("inactive");
  });
  messageB.classList.add("hide");
};

const checkwinner = () => {
  let foundwinner = false;
  for (let pattern of Win) {
    let pos1 = boxes[pattern[0]].innerHTML;
    let pos2 = boxes[pattern[1]].innerHTML;
    let pos3 = boxes[pattern[2]].innerHTML;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      foundwinner = true;
      showWinner(pos1);
      break;
    }
  }
  if (!foundwinner && Array.from(boxes).every(box => box.innerHTML !== "")) {
    draw();
  }
};

resetBtn.addEventListener("click", resetF);
window.addEventListener("load", resetF);