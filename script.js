// a gameboard object to store the game inside an arr

const Gameboard = (function () {
  let gameboard = [];
  for (let i = 0; i < 9; i++) {
    gameboard[i] = null;
  }

  const addMarker = (marker, index) => {
    gameboard[index - 1] = marker;
  };

  const getGameboard = () => {
    return gameboard;
  };

  const clearGameboard = () => {
    for (let i = 0; i < 9; i++) {
      gameboard[i] = null;
    }
  };
  return { addMarker, getGameboard, clearGameboard };
})();

// a function factory to create player oblects

function createPlayer(name, marker) {
  let playerMarker = marker;
  let playerName = name;

  const getPlayerMarker = () => {
    return playerMarker;
  };

  const getPlayerName = () => {
    return playerName;
  };

  const setPlayerName = (newName) => {
    playerName = newName;
  };

  return { getPlayerMarker, getPlayerName, setPlayerName };
}

// a function to check for winner

function checkWinner() {
  let arr = Gameboard.getGameboard();

  if (arr[0] === arr[1] && arr[1] === arr[2] && arr[0] !== null) {
    return arr[0];
  }
  else if (arr[3] === arr[4] && arr[4] === arr[5] && arr[3] !== null) {
    return arr[3];
  }
  else if (arr[6] === arr[7] && arr[7] === arr[8] && arr[6] !== null) {
    return arr[6];
  }
  else if (arr[0] === arr[3] && arr[3] === arr[6] && arr[0] !== null) {
    return arr[0];
  }
  else if (arr[1] === arr[4] && arr[4] === arr[7] && arr[1] !== null) {
    return arr[1];
  }
  else if (arr[2] === arr[5] && arr[5] === arr[8] && arr[2] !== null) {
    return arr[2];
  }
  else if (arr[0] === arr[4] && arr[4] === arr[8] && arr[0] !== null) {
    return arr[0];
  }
  else if (arr[2] === arr[4] && arr[4] === arr[6] && arr[2] !== null) {
    return arr[2];
  }
  else {
    return null;
  }
}

// check if game is a tie

function checkTie() {
  let arr = Gameboard.getGameboard();
  for (let i = 0; i < 9; i++) {
    if (arr[i] === null) return false;
  }
  return true;
}

// a function to check if game is over

const gameOver = (function () {
  let winner;

  const isWinner = () => {
    winner = checkWinner();
    if (winner !== null) return true
    else return false;
  };

  const isTie = () => {
    return checkTie();
  };

  const getWinnerMarker = () => {
    return winner;
  };

  return { isWinner, isTie, getWinnerMarker };
})();

// a function to control the flow of the game

const gameFlow = (function () {
  let currentMarker = 'X';

  const getCurrentMarker = () => {
    return currentMarker;
  };

  const changeMarker = () => {
    switch(currentMarker) {
      case 'X':
        currentMarker = 'O';
        break;
      case 'O':
        currentMarker = 'X';
        break;
    };
  };
  
  return { getCurrentMarker, changeMarker };
})();

// a function to check if an element conatin a marker

function isEmpty(element) {
  if (element.textContent.trim() === '') {
    return true;
  }
  else return false;
}

// the game begin here

const playAgain = document.querySelector('.play-again')

const input1 = document.querySelector('#player1');
const input2 = document.querySelector('#player2');

let player1 = createPlayer('soso', 'X');
let player2 = createPlayer('ruru', 'O');

const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
backdrop.showModal();
modal.showModal();

const play = document.querySelector('.play')
play.addEventListener('click', (e) => {
  if (input1.checkValidity() && input2.checkValidity()){
    player1.setPlayerName(input1.value);
    player2.setPlayerName(input2.value);

    backdrop.close();
    modal.close();
    e.preventDefault();
    bar.textContent = `${player1.getPlayerName()} Turn`;
  }
});

const places = document.querySelectorAll(".place");
const bar = document.querySelector(".bar");

places.forEach(place => {
  place.addEventListener("click", () => {
    if (isEmpty(place) && !gameOver.isWinner() && !gameOver.isTie()) {
      console.log(isEmpty(place));
      let index = place.id.slice(1);
      Gameboard.addMarker(gameFlow.getCurrentMarker(), index);
  
      place.textContent = gameFlow.getCurrentMarker();
  
      if (gameFlow.getCurrentMarker() == 'X') {
        bar.textContent = `${player2.getPlayerName()} Turn`;
      }
      else {
        bar.textContent = `${player1.getPlayerName()} Turn`;
      }
      gameFlow.changeMarker();
  
      if (gameOver.isWinner()) {
        let winnerMarker = gameOver.getWinnerMarker();
        if (player1.getPlayerMarker() === winnerMarker) {
          bar.textContent = `${player1.getPlayerName()} is a winner!`;
        }
        else {
          bar.textContent = `${player2.getPlayerName()} is a winner!`;
        }
        playAgain.classList.toggle('hidden');
      }
      else if (gameOver.isTie()) {
        bar.textContent = 'Game is a Tie!';
        playAgain.classList.toggle('hidden');
      }
    }
  });
});

// to create a new match

playAgain.addEventListener('click', (e) => {
  playAgain.classList.toggle('hidden');
  Gameboard.clearGameboard();

  places.forEach(place => {
    place.textContent = '';
  });

  bar.textContent = `${player1.getPlayerName()} Turn`;

  if (gameFlow.getCurrentMarker() === 'O') {
    gameFlow.changeMarker();
  }
});


