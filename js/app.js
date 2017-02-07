(function(){
// console.log('hi');

var playGame = (function Game(){

  var $pieces = document.querySelectorAll('.piece'),
      board,
      boardCoords,
      $board = $('.board'),
      $reset = $('#reset'),
      boardHistory = [];

   function randomBoard(){
    var array = []
    while (array.length < 16) {
      var randomnumber = Math.ceil(Math.random()*16)
      if(array.indexOf(randomnumber) > -1) continue;
      array[array.length] = randomnumber;
    }
    //
    // board = array;
    // buildMultiArr();
    return array;
  }


  function boardDom() {
    for (var i = 0; i < board.length; i++) {
      $pieces[i].classList.remove("spacer");
      $pieces[i].innerText = board[i];

      //check for 16th piece to use as spacer
      if( board[i] === 16 ){
        $pieces[i].classList.add("spacer");
      }
    }

  }

  function newGame(){
    //reset board
    board = randomBoard();
    boardCoords = buildMultiArr();
    boardDom();

  }
  function move(movedPiece){
    //handling moving peices
    var clickedPosition = movedPiece+ 1;
    console.log(clickedPosition);
    determineXY(clickedPosition)
  }

  function determineXY (clickedPosition){
    console.log('determineXY');
    var value = board[clickedPosition-1];
    var location = [];
    console.log('value', value);

    for (var outer = 0; outer < boardCoords.length; outer++) {
      for (var inner = 0; inner < 4; inner++) {
        if (boardCoords[outer][inner] == value){
          location = [inner+1, outer+1];
          console.log(location);
          return location;
        }
      }
    }

  }

  function buildMultiArr(){
    //creating multiDimArray to calculate x,y
    var multiDimArr = [
      [],[],[],[]
    ];

    for (var outer = 0; outer < multiDimArr.length; outer++) {
      for (var i = 0; i < 4; i++) {
        multiDimArr[outer][i] = board[(outer*4)+i];
      }
    }

    boardCoords = multiDimArr;
    console.log(multiDimArr)

    return multiDimArr;

  }

  function bindEvents(){
    // $board.on('click', function(e){
    //   move($(e.target));
    // });
    for (let i = 0; i < $pieces.length; i++) {
      $pieces[i].addEventListener("click", function(){
        move(i);
      }, false);
    }

    $reset.on('click', function(){
      newGame();
    });
  }

  bindEvents();

  return {
    newGame: newGame,
    move: move
  }


})();

playGame.newGame();

//Jquery elems






})();
