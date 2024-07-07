const MAX_N = 10;

const N = 8;
const newN = N > MAX_N ? MAX_N : N;
const finalN = newN > MAX_N ? MAX_N : newN;

function handleRightClick(event) {
  event.preventDefault();

  const i = +event.target.dataset.i;
  const j = +event.target.dataset.j;

  const cell = field[i][j];

  if (cell.isFlag) {
    cell.isFlag = false;
  } else {
    cell.isFlag = true;
  }
  showField(field);
}

document
  .querySelector("#main")
  .addEventListener("contextmenu", handleRightClick);

let field = Array.from({ length: finalN }, (el, i) =>
  Array.from({ length: finalN }, () => ({
    isMine: false,
    isOpen: false,
    isFlag: false,
    value: "",
  }))
);

placeBombs(field);
calculateValues(field);

showField(field);

document.querySelector("#main").addEventListener("click", (e) => {
  const i = +e.target.dataset.i;
  const j = +e.target.dataset.j;
  if (field[i][j].isOpen) {
    return;
  }
  openCell(field, i, j);
  showField(field);
  const gameOver = checkGameOver(field);
  if (gameOver) {
    setTimeout(resetGame, 3000);
  }
});

function showField(arr) {
  const main = document.querySelector("#main");
  main.innerHTML = "";

  const message = document.createElement("div");
  message.id = "message";
  main.appendChild(message);

  const tbl = document.createElement("table");

  arr.forEach((row, i) => {
    const tr = document.createElement("tr");
    row.forEach((cell, j) => {
      const td = document.createElement("td");
      const img = document.createElement("img");
      img.src ="https://media.tenor.com/aZMV_bT0gVEAAAAj/the-blobs-live-on-bomb.gif";

      if (cell.isOpen) {
        if (cell.isMine) {
          img.classList.add("bomb-image");
          td.appendChild(img);
        } else {
          td.innerText = cell.value;
        }
      } else if (cell.isFlag) {
        td.innerText = "🚩";
      } else {
        td.innerText = "";
      }

      td.dataset.i = i;
      td.dataset.j = j;
      td.classList.add(cell.isOpen ? "open" : "closed");
      tr.append(td);
    });

    tbl.append(tr);
  });
  main.append(tbl);
}
function placeBombs(arr) {
  const n = arr.length;
  const numberBombs = Math.floor(n * n * 0.25);

  let placedBombs = 0;
  arr.forEach((row) => {
    row.forEach((cell) => {
      if (placedBombs < numberBombs && !cell.isMine && Math.random() < 0.3) {
        cell.isMine = true;
        placedBombs++;
      }
    });
  });
}

function calculateValues(arr) {
  const n = arr.length;

  arr.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell.isMine) {
        return;
      }
      let count = 0;

      [-1, 0, 1].forEach((di) => {
        [-1, 0, 1].forEach((dj) => {
          const ni = i + di;
          const nj = j + dj;
          if (ni >= 0 && ni < n && nj >= 0 && nj < n && arr[ni][nj].isMine) {
            count++;
          }
        });
      });

      cell.value = count > 0 ? count.toString() : "";
    });
  });
}
function openCell(arr, i, j) {
  arr[i][j].isOpen = true;
  if (arr[i][j].isMine) {
    revealField(arr);
  } else if (arr[i][j].value === "") {
    const n = arr.length;
    [-1, 0, 1].forEach((di) => {
      [-1, 0, 1].forEach((dj) => {
        const ni = i + di;
        const nj = j + dj;
        if (ni >= 0 && ni < n && nj >= 0 && nj < n && !arr[ni][nj].isOpen) {
          openCell(arr, ni, nj);
        }
      });
    });
  }
}

function revealField(arr) {
  arr.forEach((row) => {
    row.forEach((cell) => {
      cell.isOpen = true;
    });
  });
}

function checkGameOver(arr) {
  const n = arr.length;
  let gameOver = false;

  let openedCellCount = 0;
  let bombOpened = false;

  arr.forEach((row) => {
    row.forEach((cell) => {
      if (!cell.isMine && cell.isOpen) {
        openedCellCount++;
      }
      if (cell.isMine && cell.isOpen) {
        bombOpened = true;
      }
    });
  });
  let messageElement = document.querySelector("#message");
  if (openedCellCount === n * n - finalN) {
    gameOver = true;
    messageElement.innerText = "Вы выиграли!";
  }

  if (bombOpened) {
    gameOver = true;
    messageElement.innerText = "Вы проиграли. Попробуйте ещё раз!";
  }
  arr.forEach((row) => {
    row.forEach((cell) => {
      if (cell.isMine && cell.isOpen) {
        gameOver = true;
      }
    });
  });

  return gameOver;
}

function resetGame() {
  field = Array.from({ length: finalN }, (el, i) =>
    Array.from({ length: finalN }, () => ({
      isMine: false,
      isOpen: false,
      isFlag: false,
      value: "",
    }))
  );
  placeBombs(field);
  calculateValues(field);
  showField(field);
}
