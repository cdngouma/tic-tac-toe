import React from 'react';
import './App.css';

import Board from './Board';
import Stats from './Stats';

const SIZE = 3;

function App() {
   const [turn, setTurn] = React.useState('');
   const [grid, setGrid] = React.useState([{}]);
   const [stats, setStats] = React.useState({});
   const [gameState, setGameState] = React.useState('unlocked');

   React.useEffect(startNewGame, []);

   function startNewGame() {
      setStats({
         'circle': 0,
         'cross': 0,
         'ties': 0
      });
      setTurn('corss');
      setGameState('unlocked');
      initBoard();
   }

   function initBoard() {
      let tmp_grid = [];
      for (let i = 0; i < SIZE * SIZE; i++) {
         tmp_grid.push({ val: '', state: 'open' });
      }
      setGrid(tmp_grid);
   }

   function setCell(event) {
      if (gameState === 'locked' || event.target.textContent !== '') {
         return;
      }
      const position = event.target.id.slice(-1);
      let tmp_grid = [...grid];
      tmp_grid[position].val = turn === 'circle' ? 'O' : 'X';
      tmp_grid[position].state = 'used';
      setTurn(turn === 'circle' ? 'cross' : 'circle');
      setGrid(tmp_grid);

      checkForWin();
   }

   function checkForWin() {
      let winnerSymbol = undefined;
      for (let x = 0; x < SIZE; x++) {
         // Check along rows
         if (grid[x * SIZE].val !== '' && grid[x * SIZE].val === grid[x * SIZE + 1].val && grid[x * SIZE + 1].val === grid[x * SIZE + 2].val) {
            highlightCells(x * SIZE, x * SIZE + 1, x * SIZE + 2);
            winnerSymbol = grid[x * SIZE].val;
         }
         // Check along columns 
         else if (grid[x].val !== '' && grid[x].val === grid[SIZE + x].val && grid[SIZE + x].val === grid[2 * SIZE + x].val) {
            highlightCells(x, SIZE + x, 2 * SIZE + x);
            winnerSymbol = grid[x].val;
         }
         // Check along diagonal to the bottom right
         else if (grid[0].val !== '' && grid[0].val === grid[SIZE + 1].val && grid[SIZE + 1].val === grid[2 * SIZE + 2].val) {
            highlightCells(0, SIZE + 1, 2 * SIZE + 2);
            winnerSymbol = grid[0].val
         }
         // Check along diagonal to the upper right
         else if (grid[2 * SIZE].val !== '' && grid[2 * SIZE].val === grid[SIZE + 1].val && grid[SIZE + 1].val === grid[2].val) {
            highlightCells(2 * SIZE, SIZE + 1, 2);
            winnerSymbol = grid[2].val;
         }
      }

      const numUsedCells = grid.reduce((c, o) => c + (o.val === '' ? 0 : 1), 0);

      if (winnerSymbol || numUsedCells === SIZE * SIZE) {
         if (winnerSymbol === undefined) {
            return;
         }

         const winner = winnerSymbol = 'X' ? 'cross' : 'circle';

         let tmp_stats = stats;
         tmp_stats[winner]++;
         setStats(tmp_stats)
         setGameState('locked');
         return;
      }
   }

   function highlightCells(p1, p2, p3) {
      let tmp_grid = [...grid];
      tmp_grid[p1].state = 'winner';
      tmp_grid[p2].state = 'winner';
      tmp_grid[p3].state = 'winner';
      setGrid(tmp_grid);
   }

   function switchTurn() {
      if (turn === 'circle') setTurn('cross');
      else if (turn === 'cross') setTurn('circle');
   }

   function startNextRound() {
      switchTurn();
      setGameState('unlocked');
      initBoard();
   }

   const progressButton = gameState === 'locked' ? (
      <button id="continue" onClick={startNextRound}>Continue</button>
   ) : (
         <button id="reset" onClick={startNewGame}>Reset Game</button>
      )

   return (
      <div className="App">
         <h1 id="title">TicTacToe</h1>
         <div className="App__container">
            <Stats stats={stats} />
            <Board grid={grid}
               setCell={setCell} />
            {progressButton}
         </div>
      </div>
   );
}

export default App;
