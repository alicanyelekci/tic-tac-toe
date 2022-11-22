const boardPieces = document.querySelectorAll(".board-piece");

const gameBoard = (() => {
    let board = [];

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

        if(board[0].indexOf("") === -1 && board[1].indexOf("") === -1 && board[2].indexOf("") === -1) {
            alert("Draw!");
            endRound();
        }

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
                    return;
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
                    return;
                }
            }
        }
        if (board[0][0] !== "" || board[1][1] !== "" || board[2][2]!== "") {
            if (board[0][0] === board[1][1] && board[1][1] === board[2][2]){
                playr.increaseScore();
                endRound();
                return;
            }
        }
        if (board[2][0] !== "" || board[1][1] !== "" || board[0][2]!== "") {
            if (board[2][0] === board[1][1] && board[1][1] === board[0][2]){
                playr.increaseScore();
                endRound();
                return;
            }
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
    const playerChoose = (id, playerName) => {
        document.getElementById(id).innerText = playerName;
    }
    const updateScoreboard = () => {
        document.querySelector(".score").innerText = `X : ${playerX.getScore()} - O : ${playerO.getScore()}`;
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
        playerChoose,
        updateScoreboard,
        computerPlay
    };
})();

const player = (team) => {
    let score = 0;
    const resetScore = () => score = 0;
    const getScore = () => score;
    const increaseScore = () => {
        score += 1;
        displayController.updateScoreboard();
        if (score === 3) {
            alert(`${team} has won!`)
            gameBoard.clearGame();
        }
        return score;
    }
    

    return {team, resetScore, getScore, increaseScore};
};

const btnX = document.getElementById("X");
const btnO = document.getElementById("O");
let playerX = player("X");
let playerO = player("O");
let currentPlayer;
let computerPlayer;
const btnStart = document.querySelector(".start");

btnStart.addEventListener("click", () => {
    gameBoard.clearGame();
})

btnX.addEventListener("click", () => {
    currentPlayer = playerX;
    computerPlayer = playerO;
    gameBoard.clearGame();
})

btnO.addEventListener("click", () => {
    currentPlayer = playerO;
    computerPlayer = playerX;
    gameBoard.clearGame();
})

boardPieces.forEach(key => key.addEventListener("click", () => {
    if(key.innerText === ""){
        key.innerText = currentPlayer.team;
        gameBoard.checkWin(currentPlayer);
        setTimeout(() => {
            displayController.computerPlay()
        }, 500);
    }
}));