// Get element UI
const container = document.querySelector('#container');
const startDiv = document.querySelector('#start')
const resultDiv = document.querySelector('#result');
const buttonsDiv = document.querySelector('#buttons');
const logDiv = document.querySelector('#log');
// Adjust Div visibility and text output
buttonsDiv.setAttribute('style', 'display: none');
startDiv.setAttribute('style', 'display: block');
resultDiv.textContent = '';
logDiv.textContent = '';

// Manipulate DOM UI
const buttons = document.querySelectorAll('button');
// iterate through each button
buttons.forEach((button) => {
  // add 'click' listener for each button
  if (button.id === 'start-game') button.addEventListener('click', () => startGame());
  else button.addEventListener('click', () => startRound(button.id));
});

// Constant of the possible values
const VALID_SELECTIONS = {
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSOR: 'scissor'
};

// Initial result values
const INIT_RESULT = {
  playerScore: 0,
  computerScore: 0,
  roundNumber: 0
};

let result = {...INIT_RESULT} ;

/**
 * Initialization UI and internal variables
 */
const init = () => {
  // initialization of the result
  result = {...INIT_RESULT};
  // init UI
  resultDiv.textContent = `Player ${result.playerScore} - Computer ${result.computerScore}`;
  buttonsDiv.setAttribute('style', 'display: block');
  startDiv.setAttribute('style', 'display: none');
  logDiv.textContent = '';
}

/**
 * Random selection of 'rock', 'paper', or 'scissor' by the computer
 *
 * @return {string} Computer's selection
 */
const computerPlay = () => {
  const possibleChoices = Object.values(VALID_SELECTIONS);
  const randomIndex = Math.floor(Math.random() * 3);
  return(possibleChoices[randomIndex]);
}

/**
 * Return the result of the RPS round. Player
 *
 * @param {string} playerSelection Player's selection (by UI)
 * @param {string} computerSelection Computer's selection 
 * @return {Object} obj {playerWon, draw, text}
 */
const playRound = (playerSelection, computerSelection) => {
  const playerSelectionLower = playerSelection.toLowerCase();
  // console.log('playRound:', `Player = ${playerSelection}, Computer = ${computerSelection}`);
  let playerWon = false 
  switch (playerSelectionLower) {
    case VALID_SELECTIONS.ROCK: 
      // Rock beats Scissor
      if (computerSelection === VALID_SELECTIONS.SCISSOR) playerWon = true;
      break;
    case VALID_SELECTIONS.PAPER:
      // Paper beats Rock 
      if (computerSelection === VALID_SELECTIONS.ROCK) playerWon = true;
      break
    case VALID_SELECTIONS.SCISSOR:
      // Scissor beats Paper 
      if (computerSelection === VALID_SELECTIONS.PAPER) playerWon = true;
      break
    default: 
      break
  }  
  
  // Return result of the round
  return { 
    playerWon,
    draw: computerSelection === playerSelectionLower,
    text: playerWon ? `You win! ${playerSelectionLower.toUpperCase()} beats ${computerSelection.toUpperCase()}` : 
            computerSelection !== playerSelectionLower ? `Computer won! ${computerSelection.toUpperCase()} beats ${playerSelectionLower.toUpperCase()}` : `Draw! you both have selected ${playerSelectionLower}` 
  }
}

/**
 * Update result
 *
 * @param {Object} resultRound 
 */
const updateResult = (resultRound) => {
  result.roundNumber++;

  if (resultRound.playerWon) result.playerScore++;
  else if (!resultRound.draw) result.computerScore++;
  // console.log(result);
}

/**
 * Start the game
 */
const startGame = () => {
  init();
}

/**
 * Start the round
*
 * @param {string} playerSelection Player's selection 
 */
const startRound = (playerSelection) => {
  // console.log(playerSelection);
  const resultRound = playRound(playerSelection, computerPlay());
  updateResult(resultRound);
  resultDiv.textContent = `Player ${result.playerScore} - Computer ${result.computerScore}`;
  logDiv.textContent = `Round ${result.roundNumber}: ${resultRound.text}`;

  if (result.playerScore === 5 || result.computerScore === 5) {
    logDiv.innerHTML = `${logDiv.textContent}<br /><h2 class="text-winner">${result.computerScore === 5 ? 'Computer' : 'Player'} has WON the game!<h2>`;
    startDiv.setAttribute('style', 'display: block');
    buttonsDiv.setAttribute('style', 'display: none');
  }
}