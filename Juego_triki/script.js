class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.winner = null;
        this.scores = { X: 0, O: 0 };
        this.winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        this.cells = document.querySelectorAll('.cell');
        this.statusText = document.getElementById('status-text');
        this.resetButton = document.getElementById('reset-button');
        this.scoreX = document.getElementById('score-x');
        this.scoreO = document.getElementById('score-o');

        this.initializeGame();
    }

    initializeGame() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
        });
        this.resetButton.addEventListener('click', () => this.resetGame());
        this.updateStatus();
    }

    handleCellClick(cell) {
        const index = cell.dataset.index;
        if (this.board[index] || this.winner) return;

        this.board[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
        cell.classList.add('disabled');

        this.checkGameEnd();
        if (!this.winner) {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateStatus();
        }
    }

    checkGameEnd() {
        for (const combo of this.winningCombos) {
            const [a, b, c] = combo;
            if (this.board[a] &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]) {
                this.winner = this.currentPlayer;
                this.scores[this.winner]++;
                this.updateScores();
                this.updateStatus();
                return;
            }
        }

        if (this.board.every(cell => cell !== null)) {
            this.winner = 'DRAW';
            this.updateStatus();
        }
    }

    updateStatus() {
        if (this.winner === 'DRAW') {
            this.statusText.innerHTML = "It's a draw!";
        } else if (this.winner) {
            this.statusText.innerHTML = `Player <span class="player-${this.winner.toLowerCase()}">${this.winner}</span> wins!`;
        } else {
            this.statusText.innerHTML = `Player <span class="player-${this.currentPlayer.toLowerCase()}">${this.currentPlayer}</span>'s turn`;
        }
    }

    updateScores() {
        this.scoreX.textContent = this.scores.X;
        this.scoreO.textContent = this.scores.O;
    }

    resetGame() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.winner = null;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'disabled');
        });
        
        this.updateStatus();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});