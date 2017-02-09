(function(){
// console.log('hi');

var playGame = (function Game(){

  var $pieces = document.querySelectorAll('.piece'),
      board,
      boardCoords,
      $board = $('.board'),
      $reset = $('#reset'),
      boardHistory = [],
      spacerLocation= [],
      spacerIndex;

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

      // if( spacerLocation[1] == (i%4)+1 ){
      //   $pieces[i].classList.add("clickable");
      // }

      //check for 16th piece to use as spacer
      if( board[i] === 16 ){
        $pieces[i].classList.add("spacer");
        spacerLocation = determineXY (16);
        console.log('spacerLocation',spacerLocation);
      }
    }

  }

  function newGame(){
    //reset board
    board = randomBoard();
    boardHistory=[];
    boardHistory.push(board);
    boardCoords = buildMultiArr();
    spacerIndex =  board.indexOf(16);

    boardDom();

  }
  function move(movedPiece){
    //handling moving peices
    var clickedIndex = board.indexOf(movedPiece);
    var xyToMove = determineXY(movedPiece);
    spacerIndex =  board.indexOf(16)
    console.log("x vals", xyToMove[0], spacerLocation[0])
    var xDiff = Math.abs( xyToMove[0] - spacerLocation[0] );
    var yDiff = Math.abs( xyToMove[1] - spacerLocation[1] );

    console.log(xDiff)

    if( (xDiff == 1 && yDiff == 0) || (xDiff == 0 && yDiff == 1) ) {
      boardHistory.push(board);
      board[clickedIndex]=16;
      board[spacerIndex]=movedPiece;
      console.log('history',boardHistory);
    }

    console.log('latest', xyToMove, spacerLocation);
    boardCoords = buildMultiArr()
    boardDom();
  }

  function determineXY (clickedPosition){
    var value = clickedPosition;
    var location = [];

    for (var outer = 0; outer < boardCoords.length; outer++) {
      for (var inner = 0; inner < 4; inner++) {
        if (boardCoords[outer][inner] == value){
          location = [inner+1, outer+1];
          // console.log(location);
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
    return multiDimArr;

  }

  function bindEvents(){
    for (let i = 0; i < $pieces.length; i++) {
      $pieces[i].addEventListener("click", function(){
        var clickedNumber = parseInt($pieces[i].innerText);
        console.log('clicked valued', clickedNumber)
        move(clickedNumber);
      }, false);
    }

    $reset.on('click', function(){
      newGame();
    });
  }

  bindEvents();

  return {
    newGame: newGame
  }


})();

playGame.newGame();

})();
