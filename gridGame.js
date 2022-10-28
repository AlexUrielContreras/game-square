const $gameBoard = document.querySelector('.game-board');
const $startGameBtn = document.querySelector('.startGame-btn');
const $activeGameTitle = document.querySelector('#active-game');
const $currentRound = document.querySelector('.current-round');
const $lives = document.querySelector('.lives');

let round = 0;
let lives = 3;
const gridSize = [4, 6, 8];
// holds the correct grid pattern
const correctGridTile = [];

const displayBoard = () => {
	document.title = 'Grid Game';
	$activeGameTitle.textContent = 'Grid Game';

	$startGameBtn.style.display = 'none';
	$currentRound.textContent = `Round ${round + 1}`;
	$gameBoard.style.gridTemplateColumns = `repeat(${gridSize[round]}, 80px)`;

	let datasetCount = 0;
	for (let col = 0; col < gridSize[round]; col++) {
		for (let row = 0; row < gridSize[round]; row++) {
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
	coloredTilesArr();
	// color the tiles with the arr numbers
	colorTiles(bubbleSort(correctGridTile));
};

const coloredTilesArr = () => {
	const randomNumberRange = gridSize[round] * gridSize[round];
	const loopRunTime = gridSize[round] * 2;

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

	let newArr = [];

	for (let i = 0; i < tileList.length; i++) {
		let exist = coloredTiles.includes(i);

		if (exist) {
			newArr.push(tileList[i]);
		}
	}

	let count = 0;
	let myInterval = setInterval(() => {
		newArr[count].classList.add('active');
		count++;

		if (count >= newArr.length) {
			clearInterval(myInterval);

			setTimeout(() => {
				clearGameBoard(newArr);

				// capture user selections
				tileList.forEach((tile) => {
					tile.addEventListener('click', captureUserClick);
				});
			}, 3000);
		}
	}, 1000);
};

const bubbleSort = (arr) => {
	let sorted = false;

	while (!sorted) {
		sorted = true;
		for (let i = 0; i < arr.length - 1; i++) {
			if (arr[i] > arr[i + 1]) {
				let temp = arr[i];

				arr[i] = arr[i + 1];
				arr[i + 1] = temp;
				sorted = false;
			}
		}
	}
	return arr;
};

const clearGameBoard = (coloredArr) => {
	coloredArr.forEach((tile) => {
		tile.classList.remove('active');
	});
};

const captureUserClick = (e) => {
	const { tileId } = e.target.dataset;
	const tile = e.path[0];

	console.log(tile, tileId);

	checkSelection(tileId, tile);
};

const checkSelection = (tileId, tile) => {
	console.log(tileId);
	console.log(correctGridTile);
	let isValid = correctGridTile.includes(parseInt(tileId));

	if (!isValid) {
		tile.classList.add('wronge-selection');
		return;
	}

	tile.classList.add('user-select');
};

$startGameBtn.addEventListener('click', displayBoard);

// every time a user makes a selections check to see
// if its wronge take a live off
// else
// return

// when player completes the grid move on to next round
