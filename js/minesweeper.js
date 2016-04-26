function MineSweeper (dim, mines) {
  this.dim = dim;
  this.mines = mines;
  this.board = this.populateBoard();
  this.countBombs();
}

MineSweeper.prototype._shuffleMines = function () {
  var mines = [];
  for (var i = 0; i < (this.dim * this.dim); i++) {
    mines.push( i < this.mines ? -1 : 0);
  }
  this._shuffleBoard(mines);
  return mines;
};

MineSweeper.prototype.populateBoard = function () {
  var mines = this._shuffleMines();
  var board = [];
  for (var k = 0; k < this.dim; k++) {
    var row = [];
    for (var l = 0; l < this.dim; l++) {
      row.push(mines[k * this.dim + l]);
    }
    board.push(row);
    row = [];
  }
  return board;
};

MineSweeper.prototype.countBombs = function () {
  for (var i = 0; i < this.dim; i++) {
    for (var j = 0; j < this.dim; j++) {
      if (this.board[i][j] !== -1) this.board[i][j] = this._countBombNeighbors(i,j);
    }
  }
};

MineSweeper.prototype._countBombNeighbors = function (x,y) {
  var bombs = 0;
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (x + i >= 0 && (x + i) < this.dim && y + j >= 0 && y + j < this.dim) {
        if (this.board[x + i][y + j] === - 1) bombs += 1;
      }
    }
  }
  return bombs;
};

MineSweeper.prototype._shuffleBoard = function (board) {
  var j, x, i;
    for (i = board.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = board[i - 1];
        board[i - 1] = board[j];
        board[j] = x;
    }
};

MineSweeper.prototype.checkSquare = function (pos) {
  return this.board[pos[0]][pos[1]];
};

MineSweeper.prototype._listOfNeighbors = function (pos) {
  var neighbors = [];
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (this._validPos([pos[0] + i, pos[1] + j])) {
        if (i !== 0 || j !== 0) neighbors.push ([pos[0] + i, pos[1] + j]);
      }
    }
  }
  return neighbors;
};

MineSweeper.prototype._validPos = function (pos) {
  return pos[0] >= 0 && pos[0] < this.dim && pos[1] >= 0 && pos[1] < this.dim;
};


var minesweep = new MineSweeper(10, 10);
// console.log(minesweep.board);
// console.log(minesweep._countBombNeighbors(5,5));

module.exports = MineSweeper;
