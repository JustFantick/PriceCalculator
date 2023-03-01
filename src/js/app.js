let viewport = window.innerWidth;
window.onresize = () => {
	viewport = window.innerWidth;
	for (let i = 0; i < progressBarLabels.length; i++) {
		actualizeProgressBar(progressBarsArr[i], i);
	}
}

const storageInput = document.getElementById('storage');
const transferInput = document.getElementById('transfer');

const storageLabel = document.querySelector('#storageLabel span');
const transferLabel = document.querySelector('#transferLabel span');

const progressBarLabels = document.querySelectorAll('.progress-bar-label span');
const genOptionsArr = [500, 500];//default values of storage & transfer 

let pricesArr = [
	calcBackblaze(genOptionsArr[0], genOptionsArr[1]),
	calcBunny(genOptionsArr[0], genOptionsArr[1]),
	calcScaleway(genOptionsArr[0], genOptionsArr[1]),
	calcVultr(genOptionsArr[0], genOptionsArr[1])];

const progressBarsArr = document.querySelectorAll('.progress-bar');
const progressBarContainerArr = document.querySelectorAll('.chart__progress-bar-container');

for (let i = 0; i < progressBarLabels.length; i++) {
	insertNumberToBlock(progressBarLabels[i], pricesArr[i]);
	actualizeProgressBar(progressBarsArr[i], i);
}

//insert default values to Store & Transfer
insertNumberToBlock(storageLabel, genOptionsArr[0]);
insertNumberToBlock(transferLabel, genOptionsArr[1]);

findAndMarkLowest(pricesArr);

storageInput.addEventListener('input', (e) => {
	genOptionsArr[0] = e.target.value;
	insertNumberToBlock(storageLabel, e.target.value);

	pricesArr[0] = calcBackblaze(genOptionsArr[0], genOptionsArr[1]);
	pricesArr[1] = calcBunny(genOptionsArr[0], genOptionsArr[1]);
	pricesArr[2] = calcScaleway(genOptionsArr[0], genOptionsArr[1]);
	pricesArr[3] = calcVultr(genOptionsArr[0], genOptionsArr[1]);

	for (let i = 0; i < progressBarLabels.length; i++) {
		insertNumberToBlock(progressBarLabels[i], pricesArr[i]);
		actualizeProgressBar(progressBarsArr[i], i);
	}
	findAndMarkLowest(pricesArr);
});

transferInput.addEventListener('input', (e) => {
	genOptionsArr[1] = e.target.value;
	insertNumberToBlock(transferLabel, e.target.value);

	pricesArr[0] = calcBackblaze(genOptionsArr[0], genOptionsArr[1]);
	pricesArr[1] = calcBunny(genOptionsArr[0], genOptionsArr[1]);
	pricesArr[2] = calcScaleway(genOptionsArr[0], genOptionsArr[1]);
	pricesArr[3] = calcVultr(genOptionsArr[0], genOptionsArr[1]);

	for (let i = 0; i < progressBarLabels.length; i++) {
		insertNumberToBlock(progressBarLabels[i], pricesArr[i]);
		actualizeProgressBar(progressBarsArr[i], i);
	}
	findAndMarkLowest(pricesArr);
});

const bunnyRadioBtn = document.querySelector('.bunny__radio');
const scalewayRadioBtn = document.querySelector('.scaleway__radio');
bunnyRadioBtn.addEventListener('click', () => {
	pricesArr[1] = calcBunny(genOptionsArr[0], genOptionsArr[1]);
	insertNumberToBlock(progressBarLabels[1], pricesArr[1]);
	actualizeProgressBar(progressBarsArr[1], 1);
	findAndMarkLowest(pricesArr);
});
scalewayRadioBtn.addEventListener('click', () => {
	pricesArr[2] = calcScaleway(genOptionsArr[0], genOptionsArr[1]);
	insertNumberToBlock(progressBarLabels[2], pricesArr[2]);
	actualizeProgressBar(progressBarsArr[2], 2);
	findAndMarkLowest(pricesArr);
})

function insertNumberToBlock(block, number) {
	block.textContent = number;
}

function findAndMarkLowest(pricesList) {
	let lowest = Math.min(...pricesList);
	progressBarContainerArr.forEach(element => {
		element.classList.remove('lowest');
	});
	progressBarContainerArr[pricesList.indexOf(lowest)].classList.add('lowest');
}

function calcBackblaze(stor, transf) {
	let tmpPrice = (stor * 0.005) + (transf * 0.01);
	if (tmpPrice > 7) {
		return parseFloat(tmpPrice.toFixed(2));
	} else return 7;
}

function calcBunny(stor, transf) {
	const selectedRadioValue = document.querySelector('input[name="bunny"]:checked').value;

	let storePrice = selectedRadioValue === 'hdd' ? 0.01 : 0.02;
	let tempPrice = (stor * storePrice) + (transf * 0.01);
	if (tempPrice > 10) return 10;
	else return parseFloat(tempPrice.toFixed(2));
}

function calcScaleway(stor, transf) {
	const selectedRadioValue = document.querySelector('input[name="scaleway"]:checked').value;
	let storePrice = selectedRadioValue === 'single' ? 0.03 : 0.06;

	stor = (stor - 75) > 0 ? stor - 75 : 0;
	transf = (transf - 75) > 0 ? transf - 75 : 0;

	let tempPrice = (stor * storePrice) + (transf * 0.02);
	return parseFloat(tempPrice.toFixed(2));
}

function calcVultr(stor, transf) {
	let tmpPrice = (stor * 0.01) + (transf * 0.01);
	if (tmpPrice > 5) {
		return parseFloat(tmpPrice.toFixed(2));
	} else return 5;
}

function actualizeProgressBar(block, index) {
	let perCent = (pricesArr[index] / 74) * 100;//74$ = 100%
	if (viewport > 600) {
		block.style.width = perCent + '%';
		block.style.height = '100%';
	} else {
		block.style.height = perCent + '%';
		block.style.width = '100%';
	}
}