const grid = document.querySelector(".grid");
const score1 = document.querySelector("#score-1");
const score2 = document.querySelector("#score-2");
//an array of all boxes (fields) in the grid
const boxArr = Array.from(document.querySelectorAll(".box"));

class Game {
  setNextPlayer(player) {
    this.nextPlayer = player;
  }
  updateGrid(e) {
    findFilledBoxes(boxArr);
    if (e.target.textContent !== "") {
      return;
    } else {
      e.target.textContent =
        !clickedArr.length || lastEl(clickedArr) === "X" ? "O" : "X";
      clickedArr.push(e.target.textContent);

      gameResults(boxArr);
      if (win) {
        //TODO: update message
        let tempPlayer = player;
        let otherPlayer = tempPlayer === 1 ? 2 : 1;

        if (clickedArr[0] === lastEl(clickedArr)) {
          alert("Player " + tempPlayer + " wins!");
          tempPlayer === 1 ? updateScore(score1) : updateScore(score2);
        } else {
          alert("Player " + otherPlayer + " wins!");
          otherPlayer === 1 ? updateScore(score1) : updateScore(score2);
        }
      }
      if (draw) {
        alert("Draw");
      }

      //play again (resetting the grid)
      if (draw || win) {
        setTimeout(() => {
          //TODO: update win count
          //(game.playAgain(player, boxArr, win, draw), 3000);
          player = player === 1 ? 2 : 1;
          win = false;
          draw = false;
          clickedArr = [];
          boxArr.forEach(box => {
            box.textContent = "";
            box.style.color = "black";
          });
        }, 300);
      }
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

let win = false;
let draw = false;
let player = 1;
let clickedArr = [];
function boxText(box) {
  return box.textContent;
}
function lastEl(arr) {
  return arr.slice(-1)[0];
}
function updateScore(score) {
  score.textContent = String(Number.parseInt(score.textContent) + 1);
}
let game = new Game();
grid.addEventListener("click", game.updateGrid);
