(function(){
// console.log('hi');

var playGame = (function Game(){

  var $pieces = document.querySelectorAll('.piece'),
      board,
      boardCoords,
      $reset = document.getElementById('reset'), //querySelectorAll
      $replay = document.getElementById('replay'), //querySelectorAll
      boardHistory = [],
      spacerLocation= [],
      spacerIndex,
      winningBoard = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

   function randomBoard(){
    var array = []
    while (array.length < 16) {
      var randomnumber = Math.ceil(Math.random()*16)
      if(array.indexOf(randomnumber) > -1) continue;
      array[array.length] = randomnumber;
    }
    return array;
  }


  function boardDom(boardParam) {
    for (var i = 0; i < boardParam.length; i++) {
      $pieces[i].classList.remove("spacer");
      $pieces[i].innerText = boardParam[i];

      //check for 16th piece to use as spacer
      if( boardParam[i] === 16 ){
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


    var newBoard = [...board];//using newBoard otherwise boardHistory[0] will follow update as board is updated;
    boardHistory[0]=newBoard;
    boardCoords = buildMultiArr();
    spacerIndex =  board.indexOf(16);

    boardDom(board);

  }

  function replay(){
    for (let i = 0; i < boardHistory.length; i++) {
      //closure for timeout
      (function(j){
        setTimeout( function (){
          var localBoard = boardHistory[j];
          boardDom(localBoard);
        }, i*1000 );
      })( i );

    }
  }

  function move(movedPiece){
    //handling moving peices
    spacerIndex =  board.indexOf(16)

    //local var for comparison
    var clickedIndex = board.indexOf(movedPiece);
    var xyToMove = determineXY(movedPiece);
    var xDiff = Math.abs( xyToMove[0] - spacerLocation[0] );
    var yDiff = Math.abs( xyToMove[1] - spacerLocation[1] );

    //checking if position differs by one in either direction
    if( (xDiff == 1 && yDiff == 0) || (xDiff == 0 && yDiff == 1) ) {
      board[clickedIndex]=16;
      board[spacerIndex]=movedPiece;
    } else {
      return;
    }

    //Convert arrays to strings to prevent needing to iterate over each value
    if( board.toString() == winningBoard.toString()){
      console.log('Winner, winner. Chicken Dinner!');
    }

    var newBoard = [...board]; //again localizing
    boardHistory[boardHistory.length] = newBoard;
    boardCoords = buildMultiArr();
    boardDom(board);
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

    //looping instead of event delegation
    for (let i = 0; i < $pieces.length; i++) {
      $pieces[i].addEventListener("click", function(){
        var clickedNumber = parseInt($pieces[i].innerText);
        move(clickedNumber);
      }, false);
    }

    $reset.addEventListener('click', function(){
      newGame();
    });
    $replay.addEventListener('click', function(){
      replay();
    });
  }

  bindEvents();

  return {
    newGame: newGame
  }


})();

playGame.newGame();

})();
