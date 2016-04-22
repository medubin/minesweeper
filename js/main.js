var View = require('./view');
var Game = require('./minesweeper');

$(function () {
  var $board = $("#board");
  var game = new Game(10, 10);
  new View($board, game);

});
