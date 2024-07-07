let userWinners = 0;
let computerWinners = 0;

function play(userChoice) {
  const choices = ["🪨", "✂️", "📄"];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  const result = determineWinner(userChoice, computerChoice);

  const resultElement = document.getElementById("result");
  resultElement.innerHTML = ` Вы выбрали: ${userChoice}<br>Компьютер выбрал: ${computerChoice}<br><br>${result}`;
  document.getElementById( "score").textContent = ` Счёт: ${userWinners}:${computerWinners}`;
  showResultWinners();
}

function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "Ничья!";
  }

  if (
    (userChoice === "🪨" && computerChoice === "✂️") ||
    (userChoice === "✂️" && computerChoice === "📄") ||
    (userChoice === "📄" && computerChoice === "🪨")
  ) {
    userWinners++;
    return "Вы победили в этом раунде!";
  } else {
    computerWinners++;
    return "Компьютер победил в этом раунде!";
  }
}

function showResultWinners() {
  if (userWinners === 3 || computerWinners === 3) {
    if (userWinners === 3) {
      document.getElementById("resultWinners").textContent =
        "Вы победили! Поздравляем!";
    } else {
      document.getElementById("resultWinners").textContent = "Вы проиграли! ";
    }
    userWinners=0
    computerWinners=0
    document.getElementById( "score").textContent = ` Счёт: ${userWinners}:${computerWinners}`;
  }
}


