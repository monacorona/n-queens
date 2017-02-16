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
  var solution = []; //fixme
  var board = new Board({n: n});
  for (var i = 0; i < n; i++) {
    var row = board.get(i);
    board.togglePiece(i, i);
    solution.push(row);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
 
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  
  var board = new Board({n: n});

  var findSolutions = function findSolutions(piecesPlaced) {
    var row = board.get(piecesPlaced);
    // iterate through the row
    row.forEach(function(_, index) {
      // place a piece
      board.togglePiece(piecesPlaced, index);
      // increase our count of the pieces placed
      piecesPlaced++;
      // if conflict
      if (board.hasAnyRooksConflicts()) {
        // decrease our count of pieces placed and remove the piece
        board.togglePiece(--piecesPlaced, index);
      // if no conflict
      } else {
        // if all pieces have been placed
        if (piecesPlaced === n) {
          // increase the solution count by one
          solutionCount++;
        } else {
          // else we recurse on next row 
          findSolutions(piecesPlaced);
        }
        // decrease the count of pieces placed and remove the piece
        board.togglePiece(--piecesPlaced, index);
      }
    });
  };

  findSolutions(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
