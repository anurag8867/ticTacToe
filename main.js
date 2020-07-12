'use strict';
const readline = require('readline');
const botPlaceNumber = require('./botPlaceNumber');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    exceuteUserTurn(input);
});

let gameObject = null;
const userSymbol = 'X';
const computerSymbol = 'o';
const rowLength = 3;
const columnLength = 3;
let ticTacToeObject = null;

/**
 * Execute the game and apply user's input, whatever he has chosen
 * @param {*} input 
 */
function exceuteUserTurn(input) {
    if (validatePlaceNumber(input)) {
        let [rowNumber, columnNumber] = [ticTacToeObject[input][0], ticTacToeObject[input][1]];
        gameObject[rowNumber][columnNumber] = userSymbol;
        ticTacToeObject[input] = null;
        if (isWinnerFound()) {
            winnerFound({ who: 'user' });
            return;
        }
        printTicTac()
        exceuteComputerTurn(input, rowNumber, columnNumber);
    }
    return;
}

/**
 * Execute the game and apply Computer's input, as computer is another player here
 * @param {*} userInput
 */
function exceuteComputerTurn(userInput) {
    let computerPlaceNumber = botPlaceNumber.findComputerPlaceNumber({
        userInput, ticTacToeObject, gameObject,
        availablePlaces: findAvailablePlaces(),
        rowLength, columnLength, userSymbol, computerSymbol
    });
    let [rowNumber, columnNumber] = [ticTacToeObject[computerPlaceNumber][0], ticTacToeObject[computerPlaceNumber][1]];
    gameObject[rowNumber][columnNumber] = computerSymbol;
    ticTacToeObject[computerPlaceNumber] = null;
    if (isWinnerFound()) {
        winnerFound({ who: 'computer' });
        return;
    }
    console.log('\x1b[36m%s\x1b[0m', 'Bot');
    console.log(`${computerPlaceNumber}`);
    printTicTac();
    askInput({ nextTurn: true });
}


/**
 * There will be some places are already taken by either user or computer so,
 * this function will guide us what are the places which aren't yet taken by anyone
 */
function findAvailablePlaces() {
    let places = [];
    for (let key in ticTacToeObject) {
        if (ticTacToeObject[key]) {
            places.push(key);
        }
    }
    return places;
}


/**
 * There will make sure that a place number must be chosen by the user and it must inside our scope(1-9)
 * @param input
 */
function validatePlaceNumber(input) {
    if (!input) {
        console.log('A Place number, is required to proceed ahead');
        return false;
    }
    if (!ticTacToeObject[input]) {
        console.log('\x1b[36m%s\x1b[0m', `\nThis place number is already being filled earlier, please choose` +
            ` an available place number out of ${findAvailablePlaces()}`);
        return false;
    }
    return true;
}


/**
 * This will create an embedded array of 3*3
 */
function createPrintObject() {
    gameObject = [];
    let tempArray = [];
    for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
        tempArray = [];
        for (let columnIndex = 0; columnIndex < columnLength; columnIndex++) {
            // I want to write my game as.
            // 1 2 3 
            // 4 5 6
            // 7 8 9
            tempArray.push(3 * rowIndex + columnIndex + 1)
        }
        gameObject.push(tempArray);
    }
    return gameObject;
}


/**
 * This function will print the game on in console.
 */
function printTicTac() {
    let modifiedObject = String(gameObject);
    modifiedObject = modifiedObject.replace(/,/g, '');
    let finalGameToPrint = '\t\t\t\t';
    for (let index = 0; index < modifiedObject.length; index++) {
        finalGameToPrint += modifiedObject.substring(index, index + 1)
        finalGameToPrint += ((index + 1) % 3) === 0 ? index === modifiedObject.length - 1 ? '' : ` \n\t\t\t\t--------- \n\t\t\t\t` : ' | ';
    }
    console.log(`\n${finalGameToPrint}\n`);
}


/**
 * This function will be used to ask user to place his turn
 */
function askInput({ nextTurn = false }) {
    if (nextTurn) {
        console.log('\x1b[33m%s\x1b[0m', 'Your Turn!');
        return;
    }
    console.log('\x1b[36m%s\x1b[0m', `\nPlease type Place number of your choice, place number must be between 1 to ` +
        `${columnLength * rowLength}`);
    console.log('\x1b[33m%s\x1b[0m', 'Your Turn!');
    return;
}


/**
 * This function will be if any of the user has won the game
 */
function isWinnerFound() {
    let winner = false;

    //check row completion
    for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
        if (gameObject[rowIndex][0] === gameObject[rowIndex][1] && gameObject[rowIndex][1] === gameObject[rowIndex][2]) {
            return true;
        }
    }

    //check column completion
    for (let colIndex = 0; colIndex < columnLength; colIndex++) {
        if (gameObject[0][colIndex] === gameObject[1][colIndex] && gameObject[1][colIndex] === gameObject[2][colIndex]) {
            return true;
        }
    }

    // check backslash diagonal completion
    if (gameObject[0][0] === gameObject[1][1] && gameObject[1][1] === gameObject[2][2]) {
        return true
    }

    // check frontslash diagonal completion
    if (gameObject[0][2] === gameObject[1][1] && gameObject[1][1] === gameObject[2][0]) {
        return true
    }
    isGameOn();
    return winner;
}


/**
 * At some point of time our game will gets completed where it becomes a tie.
 */
function isGameOn() {
    if (findAvailablePlaces().length < 2) {
        printTicTac();
        console.log('\x1b[36m%s\x1b[0m', `\nGame Completed with a Tie`);
        start({ isRestart: true });
        return false;
    }
    return true;
}


/**
 * it will be used to print the status of game winner (it can be either user or computer)
 */
function winnerFound({ who }) {
    printTicTac();
    let message = `:) Congartulations you won this game`
    if (who === `computer`) {
        message = `:( So, sorry you lost this game`
    }
    console.log('\x1b[33m%s\x1b[0m', `\n${message}`);
    start({ isRestart: true });
}

function start({ isRestart = false }) {
    let message = 'A new Game has started';
    ticTacToeObject = {
        1: [0, 0],
        2: [0, 1],
        3: [0, 2],
        4: [1, 0],
        5: [1, 1],
        6: [1, 2],
        7: [2, 0],
        8: [2, 1],
        9: [2, 2],
    };
    if (isRestart) {
        console.log('\n-----------------------------------------------------------------------------------------------------------------------');
        message = `Game has restarted, let's play more`;
    }
    console.log('\x1b[32m%s\x1b[0m', `\n${message}`);
    printTicTac(createPrintObject());
    askInput({ nextTurn: false });
}
start({ isRestart: false })