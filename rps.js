// converting the score string to an object again
// load the score
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  loses: 0,
  ties: 0
}

/*
if(!score) { //if score is null
  score = {
    wins: 0,
    loses: 0,
    ties: 0
  }
}
*/

// to start the score
updateScoreElement();

let isAutoPlaying = false;
let intervalID;

function autoPlay(){

  if(!isAutoPlaying){
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);

    isAutoPlaying = true;
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;
  }

}

// eventlisteners for the RPS buttons
document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
});

// adding key events to play
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r'){
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});

function playGame(playerMove){
  const computerMove = pickComputerMove();
  let result = '';

  // determine results
  if (playerMove === 'scissors'){
    if(computerMove === 'rock'){
      result = 'You lose';
    } else if(computerMove === 'paper') {
      result = 'You win';
    } else if(computerMove === 'scissors') {
      result = 'Tie';
    }

  } else if (playerMove === 'paper'){
    if(computerMove === 'rock'){
      result = 'You win';
    } else if(computerMove === 'paper') {
      result = 'Tie';
    } else if(computerMove === 'scissors') {
      result = 'You lose';
    }

  } else if (playerMove === 'rock'){
    if(computerMove === 'rock'){
      result = 'Tie';
    } else if(computerMove === 'paper') {
      result = 'You lose';
    } else if(computerMove === 'scissors') {
      result = 'You win';
    }
  }

  
  // update the scores
  if (result === 'You win') {
    score.wins += 1;
  } else if (result === 'You lose') {
    score.loses += 1;
  } else if (result === 'Tie') {
    score.ties += 1;
  }
  
  // saving the results on localStorage
  // it receives 2 string values (localStorage only support strings)
  // JSON.stringy to convert the score to string
  localStorage.setItem('score', JSON.stringify(score));
  
  // to update the score
  updateScoreElement();
  
  // final message
  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You <img class="move-icon" src="img/${playerMove}-emoji.png" alt="">
    <img class="move-icon" src="img/${computerMove}-emoji.png" alt=""> PC`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins} Loses: ${score.loses} Ties: ${score.ties}`;
}

// event listener for reset button and autoplay
document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
      score.wins = 0;
      score.loses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      
      // to reset the score
      updateScoreElement();
});

document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    autoPlay();
});

function pickComputerMove(){
  let computerMove = '';
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber <= 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}