const $gameBoard = document.querySelector('.game-board');
const $startGameBtn = document.querySelector('.startGame-btn');
const $activeGameTitle = document.querySelector('#active-game');
const $currentRound = document.querySelector('.current-round');

let round = 0;
let lives = 3;
const gridSize = [4, 6, 8];

const displayBoard = () => {
	document.title = 'Grid Game';
	$activeGameTitle.textContent = 'Grid Game';
	$gameBoard.style.gridTemplateColumns = `repeat(${gridSize[round]}, 80px)`;
	$startGameBtn.style.display = 'none';
	$currentRound.textContent = `Round ${round + 1}`;

	let count = 0;
	for (let col = 0; col < gridSize[round]; col++) {
		for (let row = 0; row < gridSize[round]; row++) {
			const tileEl = document.createElement('div');

			tileEl.dataset.tileId = count;
			tileEl.addEventListener('click', userClick);
			tileEl.classList.add('grid-tile');
			$gameBoard.append(tileEl);
			count++;
		}
	}

	startGame();
};

const startGame = () => {
	// array populated by random numbers
	const gridTilesArr = coloredTilesArr();

	// color the tiles with the arr numbers
	colorTiles(bubbleSort(gridTilesArr));

	// capture user clicks and color tile

	// insert user click number in arr

	// match random num arr to user click array
};

const coloredTilesArr = () => {
	const gridArr = [];
	const randomNumberRange = gridSize[round] * gridSize[round];
	const loopRunTime = gridSize[round] * 2;

	for (let i = 0; i < loopRunTime; i++) {
		let randomNum = Math.floor(Math.random() * randomNumberRange);
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
				removeColorFromTiles(newArr);
			}, 3500);
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

const removeColorFromTiles = (coloredArr) => {
	console.log(coloredArr);
	coloredArr.forEach((tile) => {
		tile.classList.remove('active');
	});
};

const userClick = (e) => {
	console.log(e.target.dataset.tileId);
	console.log('click');
};

$startGameBtn.addEventListener('click', displayBoard);
