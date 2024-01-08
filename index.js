const X_CLASS = 'x';
const O_CLASS = 'o';
const SHOW_RESULT_CLASS = 'show-result';
let X_turn = true;

const WINNING_COMBOS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const board = document.querySelector('.gameboard');
const tiles = document.querySelectorAll('.tile');
const resultPage = document.querySelector('.win');
const resultMessage = document.querySelector('.winning-message');
const restartButton = document.querySelector('.restart-button');

startGame();

// start game  done
// add the x or o   done
// check if x or o won -> if won show winner
// otherwise switch turn  done
// if every tile is filled -> show draw

function startGame() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);

    tiles.forEach((tile)=>{
        tile.classList.remove(X_CLASS, O_CLASS)
        tile.removeEventListener("click", handleClick);
        tile.addEventListener('click', handleClick, { 
            once: true
        });
    })
    board.classList.add(X_CLASS);
}

function handleClick(event) {
    if (X_turn) {
        board.classList.remove(X_CLASS);  
        board.classList.add(O_CLASS);  
        event.target.classList.add(X_CLASS);
        if(checkWin(X_CLASS)) {
            showResult(false, X_CLASS);
            return;
        } else if(isDraw()) {
            showResult(true, null);
            return;
        }
        X_turn=false;
    } else {
        board.classList.remove(O_CLASS);  
        board.classList.add(X_CLASS); 
        event.target.classList.add(O_CLASS);
        if(checkWin(O_CLASS)) {
            showResult(false, O_CLASS);
            return;
        } else if(isDraw()) {
            showResult(true, null);
            return;
        }
        X_turn=true;
    }
}

function checkWin(currentClass) {
    return WINNING_COMBOS.some((combo) => {
        return combo.every((index) => {
            return [...tiles][index].classList.contains(currentClass);
        })
    })
}

function showResult(isDraw, currentClass) {
    isDraw ? 
        resultMessage.innerText = "Draw!" : resultMessage.innerText = `${currentClass.toUpperCase()} Wins!!`;

    resultPage.classList.add(SHOW_RESULT_CLASS);
}

function isDraw() {
    return [...tiles].every((tile) => {
        return tile.classList.contains(X_CLASS) || tile.classList.contains(O_CLASS)
    })
}

restartButton.addEventListener("click", () => {
    resultPage.classList.remove(SHOW_RESULT_CLASS);

    startGame();
})

// To-Do: Create an option for Player vs Computer

// make a findEmptyTiles() function that runs after every player turn -> returns list of empty tiles

// make hitRandomEmptyTile() function which randomly puts an O into one of the tile.