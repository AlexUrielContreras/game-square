const $gameBoard = document.querySelector('.game-board');
const $startGameBtn = document.querySelector('.startGame-btn');
const $activeGameTitle = document.querySelector('#active-game');
const $currentRound = document.querySelector('.current-round');

let round = 2;
let lives = 3;
const gridSize = [4, 6, 8];

const displayBoard = () => {
	$gameBoard.style.gridTemplateColumns = `repeat(${gridSize[round]}, 80px)`;
	$startGameBtn.style.display = 'none';
	$currentRound.textContent = `Round ${round + 1}`;

	for (let col = 0; col < gridSize[round]; col++) {
		for (let row = 0; row < gridSize[round]; row++) {
			const tileEl = document.createElement('div');
			tileEl.classList.add('grid-tile');
			$gameBoard.append(tileEl);
		}
	}

	startGame();
};

const startGame = () => {
	// array populated by random numbers
	const gridTiles = makeGrid();

	// color the tiles with the arr numbers
	colorTiles(bubbleSort(gridTiles));

	// capture user clicks and color tile

	// insert user click number in arr

	// match random num arr to user click array
};

const makeGrid = () => {
	const gridArr = [];
	const range = gridSize[round] * gridSize[round];
	const runTime = gridSize[round] * 2;

	for (let i = 0; i < runTime; i++) {
		let randomNum = Math.floor(Math.random() * range);
		let isNumberInArr = gridArr.includes(randomNum);

		if (isNumberInArr) {
			i--;
		} else {
			gridArr.push(randomNum);
		}
	}

	return gridArr;
};

const colorTiles = (coloredTiles) => {
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

		if (count > newArr.length) {
			clearInterval(myInterval);
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

$startGameBtn.addEventListener('click', displayBoard);

// (() => {
// 	document.title = 'Grid Game';
// 	$activeGame.textContent = 'Grid Game';
// })();
