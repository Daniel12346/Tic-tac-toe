// an improved version of the program, removing unnecessary variables,functions and classes;
// adding a single-play mode as well as a mode selection screen
const grid = document.querySelector(".grid");
const score1 = document.querySelector("#score-1");
const score2 = document.querySelector("#score-2");
const startingScreen = document.querySelector(".starting-screen");
//an array of all boxes (fields) in the grid
const boxArr = Array.from(document.querySelectorAll(".box"));
let ai = true;
let win = false;
let draw = false;
let firstPlayerStarts = true;
let gameCount = 0;
let clickedArr = [];

if (ai) {
  score2.previousElementSibling.textContent = "Computer: ";
  score2.style.color = "goldenrod";
}

//the main function, linked to a "click" event listener
function updateGrid(e) {
  findFilledBoxes(boxArr);
  if (e.target.textContent !== "") {
    return;
  } else {
    e.target.textContent =
      !clickedArr.length || lastEl(clickedArr) === "X" ? "O" : "X";
    clickedArr.push(e.target.textContent);
    gameResults(boxArr);
    if (ai && !(win || draw)) {
      setTimeout(aiMove, 200);
    }

    if (win) {
      //the first player wins if they go first and the final, winning symbol is the same as
      //the first, which is always 0, or if they go second and the last symbol is X
      //in all other win cases, the second player wins
      if (
        (firstPlayerStarts && lastEl(clickedArr) === "O") ||
        (!firstPlayerStarts && lastEl(clickedArr) === "X")
      ) {
        alert("First player wins!");
        updateScore(score1);
      } else {
        alert("Second player wins!");
        updateScore(score2);
      }
    }

    if (draw) {
      alert("Draw");
    }
    //play again (resetting the grid)
    if (draw || win) {
      playAgain();
    }
  }
}

function findFilledBoxes(boxes) {
  boxes.forEach(box => {
    box.textContent !== ""
      ? box.classList.add("filled")
      : box.classList.remove("filled");
  });
}

function aiMove() {
  let emptyBoxes = boxArr.filter(box => box.textContent === "");
  let index = Math.floor(Math.random() * emptyBoxes.length);
  let box = emptyBoxes[index];
  box.textContent =
    lastEl(clickedArr) === "X" || clickedArr.length === 0 ? "O" : "X";
  clickedArr.push(box.textContent);
  //the ai automatically checks the win conditions after it makes a move
  gameResults(boxArr);
  if (win) {
    alert("Computer wins!");
    updateScore(score2);
    setTimeout(playAgain, 200);
  }
}
function playAgain() {
  firstPlayerStarts = !firstPlayerStarts;
  win = false;
  draw = false;
  clickedArr = [];
  boxArr.forEach(box => {
    box.textContent = "";
    box.style.color = "black";
  });
  if (ai && !firstPlayerStarts) {
    setTimeout(aiMove, 200);
  }
}

function gameResults(boxes) {
  const horizontalArrays = [
    [boxes[0], boxes[1], boxes[2]],
    [boxes[3], boxes[4], boxes[5]],
    [boxes[6], boxes[7], boxes[8]]
  ];

  const verticalArrays = [
    [boxes[0], boxes[3], boxes[6]],
    [boxes[1], boxes[4], boxes[7]],
    [boxes[2], boxes[5], boxes[8]]
  ];

  const diagonalArrays = [
    [boxes[0], boxes[4], boxes[8]],
    [boxes[2], boxes[4], boxes[6]]
  ];

  const allArrays = [horizontalArrays, verticalArrays, diagonalArrays];
  //win conditions
  for (let arrSet of allArrays) {
    arrSet.forEach(arr => {
      if (
        boxText(arr[0]) === boxText(arr[1]) &&
        boxText(arr[1]) === boxText(arr[2]) &&
        arr.every(a => boxText(a) !== "")
      ) {
        arr.forEach(box => (box.style.color = "purple"));
        win = true;
        return win;
      }
    });
  }
  if (!win && boxArr.every(box => box.textContent !== "")) {
    draw = true;
    return draw;
  }
}
function boxText(box) {
  return box.textContent;
}
function lastEl(arr) {
  return arr.slice(-1)[0];
}
function updateScore(score) {
  score.textContent = String(Number.parseInt(score.textContent) + 1);
}

grid.addEventListener("click", updateGrid);

startingScreen.addEventListener("click", function(e) {
  if (!e.target.matches("button")) {
    return;
  }
  ai = e.target.matches(".ai-mode") ? true : false;
  setTimeout(() => e.target.parentElement.remove(), 500);
});
