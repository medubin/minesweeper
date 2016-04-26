/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var View = __webpack_require__(1);
	var Game = __webpack_require__(2);
	
	$(function () {
	  var $board = $("#board");
	  var game = new Game(20, 50);
	  new View($board, game);
	
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var View = function ($el, game) {
	  this.game = game;
	  this.$el = $el;
	  this.setupBoard();
	  this.clickSquare();
	};
	
	View.prototype.setupBoard = function() {
	  for (var x = 0; x < this.game.dim; x++) {
	    var $row = $('<ul>').addClass('row');
	    for (var y = 0; y < this.game.dim; y++) {
	      var $square = $('<li>').addClass('square').data('pos', [x, y]);
	
	
	      $row.append($square);
	    }
	    this.$el.append($row);
	  }
	};
	
	
	View.prototype.clickSquare = function () {
	  this.$el.on("click", ".square", this.makeMove.bind(this));
	};
	
	View.prototype.makeMove = function ($square) {
	  var pos = $($square.target).data().pos;
	  if (this.game.checkSquare(pos) === -1) {
	    $square.target.className = 'bomb';
	  } else {
	    this.uncoverSquare($square.target, pos);
	    if (this.game.checkSquare(pos) === 0) this.spread(pos);
	  }
	};
	
	View.prototype.uncoverSquare = function ($square, pos) {
	  $($square).text(this.game.checkSquare(pos));
	  $square.className = 'safe';
	
	};
	
	View.prototype.spread = function (pos) {
	  var seen = new Set();
	  seen.add(pos.toString());
	  var squares = this.game._listOfNeighbors(pos);
	  function findCurrentSquare(idx, el) {
	    var elPos = $(el).data('pos');
	    return (elPos[0] === currentPos[0] && elPos[1] === currentPos[1]);
	  }
	
	  while (squares.length > 0) {
	    var currentPos = squares.pop();
	    var currentSquare = $('li').filter(findCurrentSquare);
	    // console.log(seen.has(currentSquare));
	    if (this.game.checkSquare(currentPos) === 0 ) {
	      var neighbors = this.game._listOfNeighbors(currentPos);
	      for (var i = 0; i < neighbors.length; i++) {
	        if (!seen.has(neighbors[i].toString())) {
	          squares.push(neighbors[i]);
	        }
	        seen.add(neighbors[i].toString());
	      }
	      // console.log(seen);
	      // squares = squares.concat(this.game._listOfNeighbors(currentPos));
	
	    }
	    this.uncoverSquare(currentSquare[0], currentPos);
	
	  }
	
	
	};
	
	
	
	
	
	
	
	
	module.exports = View;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map