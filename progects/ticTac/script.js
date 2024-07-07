const MAX_N = 5;

const N = 3;
const newN = N > MAX_N ? MAX_N : N;
const finalN = newN > MAX_N ? MAX_N : newN;

let trying = 0;
const users = ["❌", "⭕️"];

let field = Array.from({ length: finalN }, (el, i) =>
  Array.from({ length: finalN }, () => "")
);
showField(field);

document.querySelector("#main").addEventListener("click", (e) => {
  console.log(e.target.dataset);
  move(+e.target.dataset.i, +e.target.dataset.j);
  showField(field);
  const winner = checkWinner(field);
  console.log(winner);
  if (winner !== null) {
    msg.innerText = "Победитель: " + winner;
    setTimeout(resetGame, 1000);
  } else if (isFieldFull(field)) {
    msg.innerText = "Ничья";
    setTimeout(resetGame, 1000);
  }
});

function showField(arr) {
  main.innerHTML = "";
  const tbl = document.createElement("table");

  arr.forEach((row, i) => {
    const tr = document.createElement("tr");
    row.forEach((cell, j) => {
      const td = document.createElement("td");
      td.dataset.i = i;
      td.dataset.j = j;
      td.innerText = cell;
      tr.append(td);
    });

    tbl.append(tr);
  });
  main.append(tbl);
}

function move(i, j) {
  if (field[i][j] !== "") {
    return;
  }
  field[i][j] = users[trying % users.length];
  trying++;
  const msg = document.getElementById("msg");
  msg.innerText =
    "Ход номер: " + (trying + 1) + " Ходит: " + users[trying % users.length];
}

function checkWinner(arr) {
  if (arr.some((row) => row.every((cell) => cell === row[0] && cell !== ""))) {
    return arr.find((row) => row[0] !== "")[0];
  }

  const columns = arr[0].map((_, j) => arr.map((row) => row[j]));
  if (
    columns.some((column) =>
      column.every((cell) => cell === column[0] && cell !== "")
    )
  ) {
    return columns.find((column) => column[0] !== "")[0];
  }

  const diagonal1 = arr.map((row, i) => row[i]);
  if (diagonal1.every((cell) => cell === diagonal1[0] && cell !== "")) {
    return diagonal1[0];
  }

  const diagonal2 = arr.map((row, i) => row[arr.length - 1 - i]);
  if (diagonal2.every((cell) => cell === diagonal2[0] && cell !== "")) {
    return diagonal2[0];
  }

  return null;
}

function isFieldFull(arr) {
  return arr.every((row) => row.every((cell) => cell !== ""));
}

function resetGame() {
  field = Array.from({ length: finalN }, (el, i) =>
    Array.from({ length: finalN }, () => "")
  );
  trying = 0;
  showField(field);
  const msg = document.getElementById("msg");
  msg.innerText = "";
}
