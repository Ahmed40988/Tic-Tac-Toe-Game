const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const scoreDrawElement = document.getElementById('scoreDraw');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(e) {
    const clickedCellIndex = e.target.getAttribute('data-index');

    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;

    e.target.style.transform = 'scale(1.2)';
    setTimeout(() => e.target.style.transform = 'scale(1)', 100);

    checkWinner();
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            winCondition.forEach(index => cells[index].classList.add('winning-cell'));
            break;
        }
    }

    if (roundWon) {
        messageElement.textContent = `Player ${currentPlayer} wins!`;
        updateScore(currentPlayer);
        showFullScreenMessage(`Player ${currentPlayer} wins!`);
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        messageElement.textContent = 'It\'s a draw!';
        updateScore('draw');
        showFullScreenMessage('It\'s a draw!');
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateScore(winner) {
    if (winner === 'X') {
        scoreX++;
        scoreXElement.textContent = scoreX;
    } else if (winner === 'O') {
        scoreO++;
        scoreOElement.textContent = scoreO;
    } else if (winner === 'draw') {
        scoreDraw++;
        scoreDrawElement.textContent = scoreDraw;
    }
}

function showFullScreenMessage(message) {
    const fullScreenMessage = document.createElement('div');
    fullScreenMessage.className = 'fullscreen-message';
    fullScreenMessage.textContent = message;
    document.body.appendChild(fullScreenMessage);

    setTimeout(() => {
        fullScreenMessage.style.opacity = '0';
        setTimeout(() => fullScreenMessage.remove(), 500);
    }, 1500);
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    messageElement.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
