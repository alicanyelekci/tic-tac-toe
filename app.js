const gameBoard = (() => {
    let board;
    const generateBoard = () => {
        board = Array(3).fill().map(() => Array(3).fill());
    }
    const clearGame = () => {
        playerX.resetScore();
        playerO.resetScore();
        endRound();
    }
    const endRound = () => {
        boardPieces.forEach(key => {
            key.innerText = "";
        });
        generateBoard();
        displayController.updateScoreboard();
    }
    const getBoard = () => {
        let i = 0;
        for(let x = 0; x < 3; x++){
            for(let y = 0; y < 3; y++){
                board[x][y] = boardPieces[i].innerText;
                i++;
            }
        }
        return board;
    }
    const checkWin = (playr) => {
        getBoard();

        let arr = [];
        for(let x = 0; x < 3; x++){
            arr = [];
            for(let y = 0; y < 3; y++){
                arr[y] = board[x][y];
            }
            if(arr.indexOf("") === -1) {
                if (arr[0] === arr[1] && arr[1] === arr[2]){
                    playr.increaseScore();
                    endRound();
                    return true;
                }
            }
        }
        for(let y = 0; y < 3; y++){
            arr = [];
            for(let x = 0; x < 3; x++){
                arr[x] = board[x][y];
            }
            if(arr.indexOf("") === -1) {
                if (arr[0] === arr[1] && arr[1] === arr[2]){
                    playr.increaseScore();
                    endRound();
                    return true;
                }
            }
        }
        if (board[0][0] !== "" || board[1][1] !== "" || board[2][2]!== "") {
            if (board[0][0] === board[1][1] && board[1][1] === board[2][2]){
                playr.increaseScore();
                endRound();
                return true;
            }
        }
        if (board[2][0] !== "" || board[1][1] !== "" || board[0][2]!== "") {
            if (board[2][0] === board[1][1] && board[1][1] === board[0][2]){
                playr.increaseScore();
                endRound();
                return true;
            }
        }
        if(board[0].indexOf("") === -1 && board[1].indexOf("") === -1 && board[2].indexOf("") === -1) {
            alert("Draw!");
            endRound();
            if(playr === currentPlayer) {
                displayController.computerPlay();
            }
            return;
        }
    }

    return {
        getBoard,
        generateBoard,
        clearGame,
        checkWin
    };
})();

const displayController = (() => {
    const updateScoreboard = () => {
        document.querySelector(".score").innerText = `${playerX.getScore()} - ${playerO.getScore()}`;
    }
    const randomNine = () => {
        return Math.floor(Math.random() * 9);
    }
    const computerPlay = () => {
        rand = randomNine()
        if(boardPieces[rand].innerText === "") {
            boardPieces[rand].innerText = computerPlayer.team;
            gameBoard.checkWin(computerPlayer);  
        }
        else {
            computerPlay();
        }
    }

    return {
        updateScoreboard,
        computerPlay
    };
})();

const player = (team) => {
    let score = 0;
    const resetScore = () => score = 0;
    const getScore = () => score;
    const gameOver = (score) => {
        if (score === 3) {
            alert(`${team} has won!`)
            gameBoard.clearGame();
        }
    }
    const increaseScore = () => {
        score += 1;
        displayController.updateScoreboard();
        gameOver(score);
        return score;
    }

    return {team, resetScore, getScore, increaseScore};
};

const boardPieces = document.querySelectorAll(".board-piece");
const btnX = document.getElementById("X");
const btnO = document.getElementById("O");
const btnStart = document.querySelector(".start");
const playerMenu = document.querySelector(".players");
let playerX = player("X");
let playerO = player("O");
let currentPlayer;
let computerPlayer;

btnStart.addEventListener("click", () => {
    playerMenu.style.visibility = "visible";
    document.querySelector(".upper-menu").style.visibility = "hidden";
    document.querySelector(".game-board").style.visibility = "hidden";
    gameBoard.clearGame();
})

btnX.addEventListener("click", () => {
    playerMenu.style.visibility = "hidden";
    document.querySelector(".upper-menu").style.visibility = "visible";
    document.querySelector(".game-board").style.visibility = "visible";
    currentPlayer = playerX;
    computerPlayer = playerO;
    gameBoard.clearGame();
})

btnO.addEventListener("click", () => {
    playerMenu.style.visibility = "hidden";
    document.querySelector(".upper-menu").style.visibility = "visible";    currentPlayer = playerO;
    document.querySelector(".game-board").style.visibility = "visible";    currentPlayer = playerO;
    computerPlayer = playerX;
    gameBoard.clearGame();
})

boardPieces.forEach(key => key.addEventListener("click", () => {
    if(key.innerText === ""){
        key.innerText = currentPlayer.team;
        gameBoard.checkWin(currentPlayer);
        setTimeout(() => {
            displayController.computerPlay()
        }, 100);
    }
}));