(function(){
// console.log('hi');

var Game = function (){

  this.$pieces = $('.piece');
  this.board = [];
  this.boardCoords = [];

  this.randomBoard = function(){
    var array = []
    while (array.length < 16) {
      var randomnumber = Math.ceil(Math.random()*16)
      if(array.indexOf(randomnumber) > -1) continue;
      array[array.length] = randomnumber;
    }

    this.board = array;
    playGame.buildMultiArr();
    return array;
  }


  this.boardDom = function () {
    this.$pieces.removeClass("spacer");
    for (var i = 0; i < this.board.length; i++) {
      this.$pieces[i].innerText = this.board[i];

      //check for 16th piece to use as spacer
      if( this.board[i] === 16 ){
        this.$pieces[i].classList.add("spacer");
      }
    }

  }
  this.new = function(){
    //reset board
    this.board = this.randomBoard();
    this.boardDom();

  }
  this.move = function(movedPiece){
    //handling moving peices
    var clickedPosition = movedPiece.index('.piece') + 1;
    console.log(clickedPosition);
    this.determineXY(clickedPosition)
  }

  this.determineXY = function(clickedPosition){
    var value = this.board[clickedPosition-1];
    var location = [];

    for (var outer = 0; outer < this.boardCoords.length; outer++) {
      for (var inner = 0; inner < 4; inner++) {
        if (this.boardCoords[outer][inner] == value){
          location = [outer+1, inner+1];
          console.log(location);
          return location;
        }
      }
    }

  }

  this.buildMultiArr = function(){
    //creating multiDimArray to calculate x,y
    var multiDimArr = [
      [],[],[],[]
    ];

    for (var outer = 0; outer < multiDimArr.length; outer++) {
      for (var i = 0; i < 4; i++) {
        multiDimArr[outer][i] = this.board[(outer*4)+i];
      }
    }

    this.boardCoords = multiDimArr;
    console.log(multiDimArr)

    return multiDimArr;

  }


};

var playGame = new Game();

playGame.new();

//Jquery elems
var $board = $('.board');
var $reset = $('#reset');

$board.on('click', function(e){
  playGame.move($(e.target));
});

$reset.on('click', function(){
  playGame.new();
});



})();
