const $gameBoard = document.querySelector('.game-board');
const $startGameBtn = document.querySelector('.startGame-btn');
const $activeGameTitle = document.querySelector('#active-game');
const $currentRound = document.querySelector('.current-round');
const $lives = document.querySelector('.lives');
const $gameOver = document.querySelector('.game-over');
const $restartGameBtn = document.querySelector('#restart-game');

import gameBoard from './gameBoards.js'

const displayBoard = () => {
   $startGameBtn.classList.add('display-none');
   $activeGameTitle.textContent = 'Tic Tak Toe';
   
   $gameBoard.style.gridTemplateColumns = 'repeat(3, 150px)';

   gameBoard(3, 3, 'ttt-tiles');

}

























$startGameBtn.addEventListener('click', displayBoard)