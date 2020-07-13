'use-strict';

/**
 * This function will help us/Bot to choose the place where computer is gonna Execute its turn
 * @param {*} userInput
 */
function findComputerPlaceNumber({ userInput, ticTacToeObject, gameObject, availablePlaces, rowLength, columnLength, userSymbol, computerSymbol }) {
    let indexNumber = null;
    let possibilePlaceNumbers = null;
    let algo = {
        //This algo will stop user from winning
        algo1({ symbol }) {
            let possibilities = [];
            for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
                if (gameObject[rowIndex][0] === symbol && symbol === gameObject[rowIndex][1]) {
                    if (ticTacToeObject[3 * rowIndex + 2 + 1]) {
                        possibilities.push(3 * rowIndex + 2 + 1);
                    }
                } else if (gameObject[rowIndex][2] === symbol && symbol === gameObject[rowIndex][1]) {
                    if (ticTacToeObject[3 * rowIndex + 0 + 1]) {
                        possibilities.push(3 * rowIndex + 0 + 1);
                    }
                } else if (gameObject[rowIndex][2] === symbol && symbol === gameObject[rowIndex][0]) {
                    if (ticTacToeObject[3 * rowIndex + 1 + 1]) {
                        possibilities.push(3 * rowIndex + 1 + 1);
                    }
                }
            }
            for (let colIndex = 0; colIndex < columnLength; colIndex++) {
                if (gameObject[0][colIndex] === symbol && symbol === gameObject[1][colIndex]) {
                    if (ticTacToeObject[3 * 2 + colIndex + 1]) {
                        possibilities.push(3 * 2 + colIndex + 1);
                    }
                } else if (gameObject[2][colIndex] === symbol && symbol === gameObject[1][colIndex]) {
                    if (ticTacToeObject[3 * 0 + colIndex + 1]) {
                        possibilities.push(3 * 0 + colIndex + 1);
                    }
                } else if (gameObject[2][colIndex] === symbol && symbol === gameObject[0][colIndex]) {
                    if (ticTacToeObject[3 * 1 + colIndex + 1]) {
                        possibilities.push(3 * 1 + colIndex + 1);
                    }
                }
            }
            if (gameObject[0][0] === symbol && symbol === gameObject[1][1]) {
                if (ticTacToeObject[9]) {
                    possibilities.push(9);
                }
            } else if (gameObject[2][2] === symbol && symbol === gameObject[1][1]) {
                if (ticTacToeObject[1]) {
                    possibilities.push(1);
                }
            } else if (gameObject[2][2] === symbol && symbol === gameObject[0][0]) {
                if (ticTacToeObject[5]) {
                    possibilities.push(5);
                }
            }
            if (gameObject[2][0] === symbol && symbol === gameObject[1][1]) {
                if (ticTacToeObject[3]) {
                    possibilities.push(3);
                }
            } else if (gameObject[0][2] === symbol && symbol === gameObject[1][1]) {
                if (ticTacToeObject[7]) {
                    possibilities.push(7);
                }
            } else if (gameObject[2][0] === symbol && symbol === gameObject[0][2]) {
                if (ticTacToeObject[5]) {
                    possibilities.push(5);
                }
            }
            return (possibilities && possibilities.length) ? possibilities : null;
        },
        //This algo will choose a random number so our games's behaviour will keep chaging
        algo2(availablePlaces) {
            return findRandomNumberBetweenALimit({ min: 0, max: availablePlaces.length - 1 });
        }
    };

    //If bot can win
    possibilePlaceNumbers = algo.algo1({ symbol: computerSymbol });
    if (possibilePlaceNumbers) {
        //If there are more than one possibility choose randomly any possibility
        if (possibilePlaceNumbers.length > 1) {
            indexNumber = algo.algo2(possibilePlaceNumbers);
            // console.log({ possibilePlaceNumbers, availablePlaces, indexNumber }, '@3');
            return possibilePlaceNumbers[indexNumber];
        }
        // console.log({ possibilePlaceNumbers, availablePlaces, indexNumber }, '@4');
        return possibilePlaceNumbers[0];
    }

    //If user is gonna win
    possibilePlaceNumbers = algo.algo1({ symbol: userSymbol });
    if (possibilePlaceNumbers) {
        //If there are more than one possibility choose randomly any possibility
        if (possibilePlaceNumbers.length > 1) {
            indexNumber = algo.algo2(possibilePlaceNumbers);
            // console.log({ possibilePlaceNumbers, availablePlaces, indexNumber }, '@1');
            return possibilePlaceNumbers[indexNumber];
        }
        // console.log({ possibilePlaceNumbers, availablePlaces, indexNumber }, '@2');
        return possibilePlaceNumbers[0];
    }

    //Choose Randomly any number from the available places
    indexNumber = algo.algo2(availablePlaces);
    // console.log({ possibilePlaceNumbers, availablePlaces, indexNumber }, '@5');
    return availablePlaces[indexNumber];
}

/**
 * This function will find a random number between a limit
 * @param {min, max}
 */
function findRandomNumberBetweenALimit({ min = 0, max }) {
    if (!max) console.log("max value is required to find a random number");
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
    findComputerPlaceNumber
}