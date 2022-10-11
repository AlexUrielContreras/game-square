const $gameBoard = document.querySelector('.game-board');
const $startGameBtn = document.querySelector('.startGame-btn');
const $activeGame = document.querySelector('#active-game');
const $currentRound = document.querySelector('.current-round');

let round = 0;
let lives = 3;
const numOfGridTiles = [4, 6, 8];

const displayBoard = () => {
	$gameBoard.style.gridTemplateColumns = `repeat(${numOfGridTiles[round]}, 80px)`;
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

const startGame = () => {
	// array populated by random numbers
	const gridArr = [];
	const multiplier = numOfGridTiles[round] + numOfGridTiles[round];

	for (let i = 0; i < multiplier; i++) {
		let randomNum = Math.floor(Math.random() * multiplier);

		let isNumberInArr = gridArr.includes(randomNum);

		if (isNumberInArr) {
			i--;
		} else {
			gridArr.push(randomNum);
		}
	}
	// color the tiles with the arr numbers

	// capture user clicks and color tile
	// insert user click number in arr
	// match random num arr to user click array
};

$startGameBtn.addEventListener('click', displayBoard);

// (() => {
// 	document.title = 'Grid Game';
// 	$activeGame.textContent = 'Grid Game';
// })();
