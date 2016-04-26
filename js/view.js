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
