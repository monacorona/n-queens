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
  var solutionCount = 0;

  var board = new Board({n: n});
  var solution = [];
  if (n === 0) {
    return [];
  }
  for (var i = 0; i < board.attributes.n; i++) {
    solution[i] = board.get(i);
  }
  // create helper function findSolution
  
  var findSolution = function (piecesPlaced) {
    // board gets row index to iterate through
    if (solutionCount > 0) {
      console.log(solution);
      return;
    }
    var row = board.get(piecesPlaced);
    for (var i = 0; i < row.length; i++) {
      // once peice is placed
      if (solutionCount > 0) {
        console.log(solution);
        return;
      }
      board.togglePiece(piecesPlaced, i);
      // assign row into solution at respective row index
      
      piecesPlaced++;
      //solution[piecesPlaced] = row;
      // if there is a queen conflict
      if (board.hasAnyQueensConflicts()) {
        // remove piece from the board
        board.togglePiece(--piecesPlaced, i);
        // if no queen conflict
      } else {
        // if all the pieces have been placed
        if (piecesPlaced === n) {
          // increment solutionCount
          for (var i = 0; i < board.attributes.n; i++) {
            console.log(board.get(i));
            solution[i] = board.get(i);
          }
          solutionCount++;
          return;
        // if there are still pieces left to place
        } else {
          // recurse on the next row
          findSolution(piecesPlaced);
        }
        // remove piece from the board and decrease count of pieces place
        if (solutionCount > 0) {
          return;
        }
        
        board.togglePiece(--piecesPlaced, i);        
      }
    }
  };
    
  findSolution(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  if (n === 0) {
    return 1;
  }
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
      if (board.hasAnyQueensConflicts()) {
        // decrease our count of pieces placed and remove the piece
        board.togglePiece(--piecesPlaced, index);
      // if no conflict
      } else {
        // if all pieces have been placed
        if (piecesPlaced === n) {
          // increase the solution count by one
          var solution = [];
          for (var i = 0; i < board.attributes.n; i++) {
            solution[i] = board.get(i);
          }
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
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
