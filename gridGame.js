const $gameBoard = document.querySelector('.game-board');
const $startGameBtn = document.querySelector('.startGame-btn');
const $activeGameTitle = document.querySelector('#active-game');
const $currentRound = document.querySelector('.current-round');
const $lives = document.querySelector('.lives');
const $gameOver = document.querySelector('.game-over');
const $restartGameBtn = document.querySelector('#restart-game');

let round = 1;
let lives = 3;
const gridSizeArr = [4, 6, 8];
// holds the correct grid pattern
let correctGridTile = [];
// holds the user selected tiles
let userSelectionTiles = [];

const displayBoard = () => {
	// clears the board when player moves on to next round
	if (round !== 0) {
		while ($gameBoard.hasChildNodes()) {
			$gameBoard.removeChild($gameBoard.firstChild);
		}
	}

	document.title = 'Grid Game';
	$activeGameTitle.textContent = 'Grid Game';

	$startGameBtn.style.display = 'none';
	$currentRound.textContent = `Round ${round}`;
	$gameBoard.style.gridTemplateColumns = `repeat(${gridSizeArr[round - 1]}, 80px)`;
	$lives.textContent = `Lives: ${lives}`;

	let datasetCount = 0;
	for (let col = 0; col < gridSizeArr[round - 1]; col++) {
		for (let row = 0; row < gridSizeArr[round - 1]; row++) {
			const tileEl = document.createElement('div');

			tileEl.dataset.tileId = datasetCount;
			tileEl.classList.add('grid-tile');
			$gameBoard.append(tileEl);
			datasetCount++;
		}
	}

	startGame();
};

const startGame = () => {
	// array populated by random numbers
	getColoredTilesArr();
	// color the tiles with the arr numbers
	colorTiles(bubbleSort(correctGridTile));
};

const getColoredTilesArr = () => {
	const randomNumberRange = gridSizeArr[round - 1] * gridSizeArr[round - 1];

	// when round 3 is reached increase the amount of colored tiles
	let loopRunTime = round === 3 ? gridSizeArr[round - 1] * 3 : gridSizeArr[round - 1] * 2;

	for (let i = 0; i < loopRunTime; i++) {
		let randomNum = Math.floor(Math.random() * randomNumberRange);
		let isNumberInArr = correctGridTile.includes(randomNum);

		if (isNumberInArr) {
			i--;
		} else {
			correctGridTile.push(randomNum);
		}
	}
};

const colorTiles = (coloredTiles) => {
	console.log(coloredTiles);
	const tileList = document.querySelectorAll('.grid-tile');

	let matchingTiles = [];

	for (let i = 0; i < tileList.length; i++) {
		let exist = coloredTiles.includes(i);

		if (exist) {
			matchingTiles.push(tileList[i]);
		}
	}

	let count = 0;
	let myInterval = setInterval(() => {
		matchingTiles[count].classList.add('active');
		count++;

		if (count === matchingTiles.length) {
			clearInterval(myInterval);

			setTimeout(() => {
				clearGameBoard(matchingTiles);

				// capture user selections
				tileList.forEach((tile) => {
					tile.addEventListener('click', captureUserClick);
				});
			}, 3000);
		}
	}, 1000);
};

const bubbleSort = (tileArr) => {
	let sorted = false;

	while (!sorted) {
		sorted = true;
		for (let i = 0; i < tileArr.length - 1; i++) {
			if (tileArr[i] > tileArr[i + 1]) {
				let temp = tileArr[i];

				tileArr[i] = tileArr[i + 1];
				tileArr[i + 1] = temp;
				sorted = false;
			}
		}
	}
	return tileArr;
};

const clearGameBoard = (coloredArr) => {
	coloredArr.forEach((tile) => {
		tile.classList.remove('active');
	});
};

const captureUserClick = (e) => {
	const { tileId } = e.target.dataset;
	const tile = e.path[0];

	checkSelection(tileId, tile);
};

const checkSelection = (tileId, tile) => {
	let isValid = correctGridTile.includes(parseInt(tileId));

	if (!isValid) {
		tile.classList.add('wrong-selection');
		lives--;
		$lives.textContent = `Lives: ${lives}`;

		if (lives === 0) {
			endGame();
		}

		return;
	}

	tile.classList.add('user-select');
	userSelectionTiles.push(tileId);

	if (userSelectionTiles.length === correctGridTile.length) {
		if (round === 3) {
			victory();
		} else {
			nextRound();
		}
	}
};

const endGame = () => {
	const tileList = document.querySelectorAll('.grid-tile');

	tileList.forEach((tile) => {
		tile.removeEventListener('click', captureUserClick);
	});
	$gameOver.style.visibility = 'visible';
};

const restartGame = () => {
	const tileList = document.querySelectorAll('.grid-tile');

	round = 1;
	lives = 3;
	$lives.textContent = `Lives: ${lives}`;

	correctGridTile = [];
	userSelectionTiles = [];

	tileList.forEach((tile) => {
		tile.classList.remove('user-select', 'wrong-selection');
	});

	$gameOver.style.visibility = 'hidden';

	displayBoard();
};

const nextRound = () => {
	correctGridTile = [];
	userSelectionTiles = [];

	round++;
	displayBoard();
};

const victory = () => {
	$gameBoard.remove();

	const victoryDivEl = document.createElement('section');
	victoryDivEl.classList.add('victory');

	const victoryTitleEl = document.createElement('h2');
	victoryTitleEl.textContent = 'You Win !!!!!!';

	victoryDivEl.append(victoryTitleEl);
	document.body.append(victoryDivEl);
};

$startGameBtn.addEventListener('click', displayBoard);
$restartGameBtn.addEventListener('click', restartGame);

// every time a user makes a selections check to see
// if its wronge take a live off
// else
// mive on to next round
