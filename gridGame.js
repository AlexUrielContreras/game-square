const $gameBoard = document.querySelector('.game-board');
const $startGameBtn = document.querySelector('.startGame-btn');
const $activeGame = document.querySelector('#active-game');
const $currentRound = document.querySelector('.current-round');

let round = 0;
let lives = 3;
const numOfGridTiles = [4, 6, 8];

const displayBoard = (e) => {
	$gameBoard.style.gridTemplateColumns = `repeat(${numOfGridTiles[round]}, 75px)`;
	$startGameBtn.style.display = 'none';
	$currentRound.textContent = `Round ${round + 1}`;

	for (let col = 0; col < numOfGridTiles[round]; col++) {
		for (let row = 0; row < numOfGridTiles[round]; row++) {
			const tileEl = document.createElement('div');
			tileEl.classList.add('grid-tile');
			$gameBoard.append(tileEl);
		}
	}

	startGame();
};

$startGameBtn.addEventListener('click', displayBoard);

// (() => {
// 	document.title = 'Grid Game';
// 	$activeGame.textContent = 'Grid Game';
// })();
