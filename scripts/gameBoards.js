const $gameBoard = document.querySelector('.game-board');

const gameBoard = (colNum, rowNum, tileName) => {

   let datasetCount = 0;
	for (let col = 0; col < colNum; col++) {
		for (let row = 0; row < rowNum; row++) {
			const tileEl = document.createElement('div');

			tileEl.dataset.tileId = datasetCount;
			tileEl.classList.add(tileName);
			$gameBoard.append(tileEl);
			datasetCount++;
		}
	}

}

export default gameBoard