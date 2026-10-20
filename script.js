const choiceButtons = document.querySelectorAll(".choice");
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
const roundLabel = document.getElementById("round-label");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const roundMoves = document.getElementById("round-moves");
const resetButton = document.getElementById("reset-button");

const choices = ["stone", "paper", "scissors"];
const emojis = { stone: "🪨", paper: "📄", scissors: "✂️" };
const names = { stone: "Stone", paper: "Paper", scissors: "Scissors" };

let playerScore = 0;
let computerScore = 0;

function getWinner(player, computer) {
  if (player === computer) return "draw";
  if (
    (player === "stone" && computer === "scissors") ||
    (player === "paper" && computer === "stone") ||
    (player === "scissors" && computer === "paper")
  ) return "player";
  return "computer";
}

function playRound(playerChoice) {
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  const winner = getWinner(playerChoice, computerChoice);

  roundLabel.textContent = "ROUND RESULT";
  roundMoves.textContent = `You chose ${emojis[playerChoice]} ${names[playerChoice]} · Computer chose ${emojis[computerChoice]} ${names[computerChoice]}`;
  resultTitle.className = "";
  resultMessage.className = "";

  if (winner === "player") {
    playerScore++;
    resultTitle.textContent = "You win this round! 🎉";
    resultMessage.textContent = `${names[playerChoice]} beats ${names[computerChoice]}. Great move!`;
    resultMessage.classList.add("winner");
  } else if (winner === "computer") {
    computerScore++;
    resultTitle.textContent = "Computer wins this round!";
    resultMessage.textContent = `${names[computerChoice]} beats ${names[playerChoice]}. Try again!`;
    resultMessage.classList.add("loser");
  } else {
    resultTitle.textContent = "It's a draw! 🤝";
    resultMessage.textContent = "You both chose the same move. Play again!";
  }

  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => playRound(button.dataset.choice));
});

resetButton.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreElement.textContent = "0";
  computerScoreElement.textContent = "0";
  roundLabel.textContent = "READY TO PLAY?";
  resultTitle.textContent = "Make your move!";
  resultTitle.className = "";
  resultMessage.textContent = "Choose stone, paper or scissors to start the game.";
  resultMessage.className = "";
  roundMoves.textContent = "";
});
