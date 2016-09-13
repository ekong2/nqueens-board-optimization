/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({'n':n});
  var boolFlag = false;
  var result = [];

  var recurse = function(row, column){
    board.togglePiece(row,column);
    if (board.hasAnyColConflicts()){
      board.togglePiece(row,column);
      return;
    }
    if (row === n -1){
      //do something
      boolFlag = true;
      result = _.extend(result, board.rows());
      return;
    }
    for (var i = 0; i < n; i++){
      recurse(row + 1, i);
      if (boolFlag){
        return result;
      }
    }
    board.togglePiece(row,column);
  };
  for (var i = 0; i < n; i++){
    recurse(0, i);
    if (boolFlag){
      return result;
    }
  }
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({'n': n});
  var solutionCount = 0;
  var used = [];

  function decision(row, column){
    board.togglePiece(row, column);
    used[column] = 1;
    if (row === n - 1){
      solutionCount++;
      board.togglePiece(row, column);
      used[column] = 0;
      return;
    }
    for (var i = 0; i < n; i++){
      if (!used[i]){
        decision(row + 1, i);
      }
    }
    board.togglePiece(row,column);
    used[column] = 0;
  }

  for (var i = 0; i < n; i++) {
    decision(0,i);
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) return [];
  var board = new Board({'n':n});
  var boolFlag = false;
  var result = [];
  var recurse = function(row, column){
    board.togglePiece(row,column);
    if (board.hasAnyRowConflicts() || board.hasAnyColConflicts() ||
     board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()){
      board.togglePiece(row,column);
      return;
    }
    if (row === n -1){
      //do something
      boolFlag = true;
      result = _.extend(result, board.rows());
      return;
    }
    for (var i = 0; i < n; i++){
      recurse(row + 1, i);
      if (boolFlag){
        return result;
      }
    }
    board.togglePiece(row,column);
  };
  for (var i = 0; i < n; i++){
    recurse(0, i);
    if (boolFlag){
      return result;
    }
  }
  return board.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var solutionCount = 0;
  var board = new Board({'n': n});
  var used = [];

  var decision = function(row, column) {
    board.togglePiece(row, column);
    used[column] = 1;
    if (board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
      board.togglePiece(row,column);
      used[column] = 0;
      return;
    }
    if (row === n - 1) {
      solutionCount++;
      board.togglePiece(row,column);
      used[column] = 0;
      return;
    }
    for (var i = 0; i < n; i++) {
      if (!used[i]) {
        decision(row + 1, i);
      }
    }
    board.togglePiece(row,column);
    used[column] = 0;
  };

  for (var i = 0; i < n; i++) {
    decision(0,i);
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

