const selectionBtns = document.querySelectorAll(".buttons button");
const resetBtn = document.querySelector(".reset-btn");

// Track the scores
let playerScore = 0;
let computerScore = 0;

selectionBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    let playerChoice = getPlayerChoice(btn);
    let computerChoice = getComputerChoice();
    let msg = playGame(playerChoice, computerChoice);

    updateScore();

    updateResultsMsg(msg);

    if (playerScore === 3) {
      showWinner();
      endGame();
    }
    if (computerScore === 3) {
      showWinner();
      endGame();
    }
  }),
);

resetBtn.addEventListener("click", resetGame);

function getPlayerChoice(btn) {
  return btn.firstElementChild.textContent;
}

function getComputerChoice() {
  const choices = ["Scissors", "Rock", "Paper"];
  const randomIndex = Math.floor(Math.random() * choices.length);

  return choices[randomIndex];
}

function playGame(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return "It's a tie!";

  if (
    (playerChoice === "Rock" && computerChoice === "Scissors") ||
    (playerChoice === "Paper" && computerChoice === "Rock") ||
    (playerChoice === "Scissors" && computerChoice === "Paper")
  ) {
    playerScore++;
    return `You win! ${playerChoice} beats ${computerChoice}`;
  } else {
    computerScore++;
    return `Computer wins! ${computerChoice} beats ${playerChoice}`;
  }
}

function updateScore() {
  const playerScoreEl = document.querySelector(
    ".scores-container .player-score",
  );
  const computerScoreEl = document.querySelector(
    ".scores-container .computer-score",
  );

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

function updateResultsMsg(mgs) {
  const resultsEl = document.querySelector(".results-container .results-msg");
  resultsEl.textContent = mgs;
}

function showWinner() {
  const winnerEl = document.querySelector(".results-container .winner-msg");
  let winnerMsg = "";

  if (playerScore === 3) {
    winnerMsg = "You have won the game!";
    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        x: winnerEl.offsetLeft + winnerEl.offsetWidth / 2,
        y: winnerEl.offsetTop + winnerEl.offsetHeight / 2,
      },
    });
  }

  if (computerScore === 3) winnerMsg = "Computer has won the game!";

  winnerEl.textContent = winnerMsg;
}

function endGame() {
  selectionBtns.forEach((btn) => (btn.disabled = true));
  resetBtn.style.opacity = 1;
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;

  updateScore();

  updateResultsMsg("");

  showWinner();

  selectionBtns.forEach((btn) => (btn.disabled = false));
  resetBtn.style.opacity = 0;
}

const winnerEl = document.querySelector(".results-container .winner-msg");
