(function(){
// console.log('hi');

var Game = function (){

  this.gameOrder = function(){
    var array = []
    while (array.length < 16) {
      var randomnumber = Math.ceil(Math.random()*16)
      if(array.indexOf(randomnumber) > -1) continue;
      array[array.length] = randomnumber;
    }


    return array;
  }

  this.board = this.gameOrder();

  this.new = function () {
    for (var i = 0; i < this.board.length; i++) {
      this.peices[i].innerText = this.board[i];
      // console.log(this.board[i]);

      //check for 16th peice to use as spacer
      if( this.board[i] === 16 ){
        // console.log('16');
        this.peices[i].classList.add("spacer");
      }
    }

  }
  this.reset = function(){

  }
  this.move = function(){

  }
  this.peices = document.querySelectorAll('.peice');

};

var playGame = new Game();

playGame.new();

console.log(playGame.peices);

})();
