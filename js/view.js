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
    $($square.target).text(this.game.checkSquare(pos));
    $square.target.className = 'safe';
  }
};

View.prototype.spread = function (pos) {
  

};








module.exports = View;
