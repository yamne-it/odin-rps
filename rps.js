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
  let result = false 
  switch (playerSelectionLower) {
    case ROCK: 
      if (computerSelection === SCISSOR) result = true
      break
    case PAPER: 
      if (computerSelection === ROCK) result = true
      break
    case SCISSOR: 
      if (computerSelection === PAPER) result = true
      break
    default: 
      break
  }  

  return result ? `You win! ${playerSelectionLower} beats ${computerSelection}` : 
           computerSelection !== playerSelectionLower ? `You Lose! ${computerSelection} beats ${playerSelectionLower}` : `Draw!` 
}

function game() {
  for (let i = 0; i < 5; i++) {
    const playerSelection = window.prompt(`Choose 'Rock', 'Paper', or 'Scissor': `, `Rock`)
    const computerSelection = computerPlay();
    console.log(playRound(playerSelection, computerSelection));
  }
}

game()