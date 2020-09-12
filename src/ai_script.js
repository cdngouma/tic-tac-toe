function checkWinner(board) {
   // Check ny rows
   for (let i = 0; i < 3; i++) {
      if (board[i][0] !== '_' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
         return board[i][0];
      }
   }
   // Check by columns
   for (let i = 0; i < 3; i++) {
      if (board[0][i] !== '_' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
         return board[0][i];
      }
   }
   // Check by diagonals
   if (board[0][0] !== '_' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0];
   }
   if (board[2][0] !== '_' && board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
      return board[2][0];
   }

   let numOpenCells = 0;
   for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
         if (board[i][j] === '_') {
            numOpenCells++;
         }
      }
   }
   if (numOpenCells === 0) {
      return 'tie';
   }
   return null;
}

function aiMove(board, players) {
   let bestScore = -Infinity;
   let move;
   for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
         // Check if spot is available
         if (board[i][j] === '_') {
            // Make move
            board[i][j] = players.ai;
            // Calc score for this move
            let score = minimax(board, players, 0, false);
            // Undo move
            board[i][j] = '_';
            if (score > bestScore) {
               bestScore = score;
               move = { i, j };
            }
         }
      }
   }
   return move;
}

const scores = {
   x: 1,
   o: -1,
   tie: 0
}

function minimax(board, players, depth, isMaximizing) {
   let winner = checkWinner(board);
   if (winner != null) {
      return scores[winner];
   }

   if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
         for (let j = 0; j < 3; j++) {
            // Check if spot is available
            if (board[i][j] === '_') {
               board[i][j] = players.ai;
               let score = minimax(board, players, depth + 1, false);
               // Undo move
               board[i][j] = '_';
               bestScore = Math.max(score, bestScore);
            }
         }
      }
      return bestScore;
   } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
         for (let j = 0; j < 3; j++) {
            // Check if spot is available
            if (board[i][j] === '_') {
               board[i][j] = players.human;
               let score = minimax(board, players, depth + 1, true);
               // Undo mobe
               board[i][j] = '_';
               bestScore = Math.min(score, bestScore);
            }
         }
      }
      return bestScore;
   }
}

export default aiMove;