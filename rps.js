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

//       alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
// Wins: ${score.wins}. Loses: ${score.loses}. Ties: ${score.ties}`);
    }

    function updateScoreElement() {
      document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins} Loses: ${score.loses} Ties: ${score.ties}`;
    }
    
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