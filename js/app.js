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

      console.log((spacerLocation[0] % 4), (i%4)+1)

      // if( spacerLocation[0] % 4 == (i%4)+1 ){
      //   $pieces[i].classList.add("clickable");
      // }

      // switch (spacerLocation[0]) {
      //   case 1:
      //     // console.log('hi from first column', spacerIndex);
      //     if( i = spacerIndex ){
      //       $pieces[i].classList.add("clickable");
      //       console.log('hi from first column', spacerIndex);
      //     }
      // 
      //     break;
      //   default:
      //     break;
      //
      // }
    //   console.log('y col', spacerLocation[1]%4)
    //   switch (spacerLocation[1]) {
    //     case 1:
    //       if((i+1)%2 == 0){
    //         $pieces[i].classList.add("clickable");
    //       }
    //
    //       break;
    //     default:
    //
    //   }
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
    spacerIndex =  board.indexOf(16)

    boardHistory.push(board);
    board[clickedIndex]=16;
    board[spacerIndex]=movedPiece;
    // console.log(board);
    console.log('history',boardHistory);

    determineXY(movedPiece);
    boardCoords = buildMultiArr()
    boardDom();
  }

  function determineXY (clickedPosition){
    console.log('determineXY');
    var value = clickedPosition;
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
        move(parseInt($pieces[i].innerText));
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
