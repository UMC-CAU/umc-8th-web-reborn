function generateRandomNumber(digits: number): string {
  const numbers = new Set<number>();
  while (numbers.size < digits) {
      numbers.add(Math.floor(Math.random() * 10));
  }
  return Array.from(numbers).join('');
}

function checkGuess(target: string, guess: string): string {
  let strikes = 0;
  let balls = 0;

  for (let i = 0; i < target.length; i++) {
      if (target[i] === guess[i]) {
          strikes++;
      } else if (target.includes(guess[i])) {
          balls++;
      }
  }

  if (strikes === 0 && balls === 0) return 'Out!';
  return `${strikes}S ${balls}B`;
}

// UI 연결
document.addEventListener('DOMContentLoaded', () => {
  const numberSelect = document.getElementById('numberSelect') as HTMLSelectElement;
  const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement;
  const inputField = document.getElementById('userInput') as HTMLInputElement;
  const guessBtn = document.getElementById('guessBtn') as HTMLButtonElement;
  const resultDisplay = document.getElementById('resultDisplay') as HTMLDivElement;

  let targetNumber = '';

  generateBtn.addEventListener('click', () => {
      const digitCount = parseInt(numberSelect.value, 10);
      targetNumber = generateRandomNumber(digitCount);
      resultDisplay.textContent = `랜덤 숫자가 생성되었습니다! (${digitCount}자리)`;
  });

  guessBtn.addEventListener('click', () => {
      const guess = inputField.value.trim();
      if (!targetNumber) {
          resultDisplay.textContent = '❗ 숫자를 먼저 생성하세요!';
          return;
      }

      if (guess.length !== targetNumber.length) {
          resultDisplay.textContent = `❗ 정확히 ${targetNumber.length}자리 숫자를 입력하세요.`;
          return;
      }

      const feedback = checkGuess(targetNumber, guess);
      resultDisplay.textContent = `결과: ${feedback}`;

      if (feedback === `${targetNumber.length}S 0B`) {
          alert('🎯 정답입니다! 게임을 초기화합니다.');
          targetNumber = '';
          inputField.value = '';
          resultDisplay.textContent = '';
      }
  });
});
