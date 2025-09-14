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
boxes.forEach(box => box.classList.remove('inactive'));
let computerMove = () => {
  let emptyBoxes = Array.from(boxes).filter(box => box.innerHTML === "");
  if (emptyBoxes.length === 0) return;
  for (let pattern of Win) {
    let values = pattern.map(i => boxes[i].innerHTML);
    if (values.filter(v => v === "X").length === 2 && values.includes("")) {
      let index = pattern[values.indexOf("")];
      boxes[index].innerHTML = "X";
      boxes[index].disabled = true;
      checkwinner();
      turnA = true;
      return;
    }
  }
  for (let pattern of Win) {
    let values = pattern.map(i => boxes[i].innerHTML);
    if (values.filter(v => v === "0").length === 2 && values.includes("")) {
      let index = pattern[values.indexOf("")];
      boxes[index].innerHTML = "X";
      boxes[index].disabled = true;
      checkwinner();
      turnA = true;
      return;
    }
  }
  let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
  let box = emptyBoxes[randomIndex];
  box.innerHTML = "X";
  box.disabled = true;
  checkwinner();
  turnA = true;
};
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerHTML === "" && messageB.classList.contains("hide")) {
      box.innerHTML = "0";
      box.disabled = true;
      checkwinner();
      if (!Array.from(boxes).every(b => b.innerHTML !== "") && messageB.classList.contains("hide")) {
        turnA = false;
        setTimeout(computerMove, 700);
      }
    }
  });
});
let disableboxes = () => {
  boxes.forEach(box => box.disabled = true);
};
let enableboxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerHTML = "";
  });
};
const showWinner = (winner) => {
  mes.innerHTML = `Congratulations, Winner is ${winner}`;
  messageB.classList.remove("hide");
  disableboxes();
  boxes.forEach(box => box.classList.add('inactive'));
};
const draw = () => {
  mes.innerHTML = "It's a draw!";
  messageB.classList.remove("hide");
  disableboxes();
  boxes.forEach(box => box.classList.add('inactive'));
};
const resetF = () => {
  turnA = true;
  enableboxes();
  messageB.classList.add("hide");
  boxes.forEach(box => box.classList.remove('inactive'));
};
const checkwinner = () => {
  let foundwinner = false;
  for (let pattern of Win) {
    let pos1 = boxes[pattern[0]].innerHTML;
    let pos2 = boxes[pattern[1]].innerHTML;
    let pos3 = boxes[pattern[2]].innerHTML;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "" && pos1 === pos2 && pos2 === pos3) {
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
