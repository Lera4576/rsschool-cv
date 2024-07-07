let randomNumbers = generateRandomNumbers();
console.log(randomNumbers);

function generateRandomNumbers() {
  const numbers = [];

  while (numbers.length != 4) {
    const number = Math.abs(Math.ceil(Math.random() * 10 - 1));

    if (numbers.indexOf(number) === -1) {
      numbers.push(number);
    }
  }
  return numbers;
}

const inputs = document.querySelectorAll("[type=number]");
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value.length > 1) {
      input.value = input.value.slice(0, 1);
    }
  });
});

function getUserNumbers() {
  const userNumbers = [];

  for (let i = 0; i < inputs.length; i++) {
    const inputsValue = inputs[i].value;
    if (inputsValue !== "") {
      userNumbers.push(+inputsValue);
    }
    const duplicates = userNumbers.filter(
      (number, index, values) => values.indexOf(number) !== index
    );
    if (duplicates.length) {
      alert("Введите разные цифры!");
      return [];
    }
  }

  if (userNumbers.length !== 4) {
    alert("Введите четыре цифры!");
    return [];
  }

  return userNumbers;
}

const button = document.querySelector("#submit");

let counter = 0;

button.addEventListener("click", () => {
  const userNumbers = getUserNumbers();
  let bulls = 0;
  let cows = 0;

  for (let i = 0; i < 4; i++) {
    if (userNumbers[i] === randomNumbers[i]) {
      bulls++;
      continue;
    }

    if (userNumbers.includes(randomNumbers[i])) {
      cows++;
    }

    const userNumberString = userNumbers.join("");
  }

  const tryElement = `
    <div>
    ПОПЫТКА ${++counter} : ${userNumbers.join(
    ""
  )} - Быки: ${bulls}, Коровы: ${cows}
    </div>
    `;

  if (bulls === 4) {
    alert(`Вы угадали число с ${counter}-ой попытки!`);
  }
  const container = document.querySelector("#tries");
  console.log(container);
  container.insertAdjacentHTML("afterbegin", tryElement);
});
