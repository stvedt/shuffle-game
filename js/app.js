(function(){
// console.log('hi');

var Game = function (){

  this.$pieces = $('.piece');

  this.randomBoard = function(){
    var array = []
    while (array.length < 16) {
      var randomnumber = Math.ceil(Math.random()*16)
      if(array.indexOf(randomnumber) > -1) continue;
      array[array.length] = randomnumber;
    }
    return array;
  }

  this.board = this.randomBoard();

  this.boardDom = function () {
    for (var i = 0; i < this.board.length; i++) {
      this.$pieces[i].innerText = this.board[i];
      // console.log(this.board[i]);

      //check for 16th piece to use as spacer
      if( this.board[i] === 16 ){
        // console.log('16');
        this.$pieces[i].classList.add("spacer");
      }
    }

  }
  this.new = function(){
    this.boardDom();

  }
  this.move = function(movedPiece){
    var clickedPosition = movedPiece.index('.piece') + 1;
    console.log('index of clicked',clickedPosition);
  }


};

var playGame = new Game();

playGame.new();


var $board = $('.board');
$board.on('click', function(e){
  playGame.move($(e.target));
});

})();
