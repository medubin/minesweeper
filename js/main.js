var View = require('./view');
var Game = require('./minesweeper');

$(function () {
  var $board = $("#board");
  var game = new Game(20, 50);
  new View($board, game);

});
