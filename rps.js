const ROCK = `rock`
const PAPER = `paper`
const SCISSOR = `scissor`

function computerPlay() {
  const possibleChoices = [
    ROCK,
    PAPER,
    SCISSOR
  ]
  const randomIndex = Math.floor(Math.random() * 3)
  return(possibleChoices[randomIndex])
}

function playRound(playerSelection, computerSelection) {
  const playerSelectionLower = playerSelection.toLowerCase()
  let playerWon = false 
  switch (playerSelectionLower) {
    case ROCK: 
      if (computerSelection === SCISSOR) playerWon = true
      break
    case PAPER: 
      if (computerSelection === ROCK) playerWon = true
      break
    case SCISSOR: 
      if (computerSelection === PAPER) playerWon = true
      break
    default: 
      break
  }  

  return playerWon ? `You win! ${playerSelectionLower} beats ${computerSelection}` : 
           computerSelection !== playerSelectionLower ? `You Lose! ${computerSelection} beats ${playerSelectionLower}` : `Draw! you both have selected ${playerSelectionLower}` 
}

function game() {
  for (let i = 0; i < 5; i++) {
    const playerSelection = window.prompt(`Choose 'Rock', 'Paper', or 'Scissor': `, `Rock`)
    const computerSelection = computerPlay();
    console.log(playRound(playerSelection, computerSelection));
  }
}

game()