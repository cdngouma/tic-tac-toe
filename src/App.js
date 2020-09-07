import React from 'react';
import './App.css';

import Board from './Board';
import Stats from './Stats';

const SIZE = 3;

function App() {
   const [player, setPlayer] = React.useState(undefined);
   const [turn, setTurn] = React.useState(undefined);
   const [grid, setGrid] = React.useState([{}]);
   const [stats, setStats] = React.useState({});
   const [gameState, setGameState] = React.useState(undefined);

   React.useEffect(startNewGame, []);

   function startNewGame() {
      setStats({
         'O': 0,
         'X': 0,
         'ties': 0,
         'round winner': undefined
      });
      setPlayer('X');
      setTurn('O');
      setGameState(undefined);
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
      if (gameState === undefined) {
         setGameState('running');
      }
      const position = event.target.id.slice(-1);
      let tmp_grid = [...grid];
      tmp_grid[position].val = turn;
      tmp_grid[position].state = 'used';
      setGrid(tmp_grid);
      checkForWin();
      toggleTurn();
   }

   function checkForWin() {
      let winner = undefined;
      let highlightedCells = [];
      for (let x = 0; x < SIZE; x++) {
         // Check along rows
         if (grid[x * SIZE].val !== '' && grid[x * SIZE].val === grid[x * SIZE + 1].val && grid[x * SIZE + 1].val === grid[x * SIZE + 2].val) {
            highlightedCells = [x * SIZE, x * SIZE + 1, x * SIZE + 2];
            winner = grid[x * SIZE].val;
         }
         // Check along columns 
         else if (grid[x].val !== '' && grid[x].val === grid[SIZE + x].val && grid[SIZE + x].val === grid[2 * SIZE + x].val) {
            highlightedCells = [x, SIZE + x, 2 * SIZE + x];
            winner = grid[x].val;
         }
         // Check along diagonal to the bottom right
         else if (grid[0].val !== '' && grid[0].val === grid[SIZE + 1].val && grid[SIZE + 1].val === grid[2 * SIZE + 2].val) {
            highlightedCells = [0, SIZE + 1, 2 * SIZE + 2];
            winner = grid[0].val
         }
         // Check along diagonal to the upper right
         else if (grid[2 * SIZE].val !== '' && grid[2 * SIZE].val === grid[SIZE + 1].val && grid[SIZE + 1].val === grid[2].val) {
            highlightedCells = [2 * SIZE, SIZE + 1, 2];
            winner = grid[2].val;
         }
      }

      const numUsedCells = grid.reduce((c, o) => c + (o.val === '' ? 0 : 1), 0);

      if (winner || numUsedCells === SIZE * SIZE) {
         let tmp_stats = stats;
         if (winner !== undefined) {
            tmp_stats[winner]++;
            tmp_stats['round winner'] = winner;
            setStats(tmp_stats)
         } else {
            tmp_stats['ties']++;
            setStats(tmp_stats);
         }
         highlightWinner(highlightedCells);
         setGameState('locked');
      }
   }

   function highlightWinner(winCells) {
      let tmp_grid = [...grid];
      for (let x in grid) {
         tmp_grid[x].class = 'dim';
      }
      for (let x of winCells) {
         tmp_grid[x].class = 'highlight breath-fast';
      }
      setGrid(tmp_grid);
   }

   function toggleTurn() {
      if (turn === 'O') setTurn('X');
      else if (turn === 'X') setTurn('O');
   }

   function selectPlayer(event) {
      if (!gameState) {
         if (player === "O") setPlayer('X');
         else setPlayer('O');
         setGameState('running');
      }
   }

   function startNextRound(event) {
      if (gameState === 'locked') {
         stats['round winner'] = undefined;
         setGameState('running');
         initBoard();
      }
   }

   let message = "Start game or select player";
   if (stats['round winner'] && gameState==='locked') {
      message = stats['round winner'] + " won!";
   } else if (gameState==='locked'){
      console.log('Drew');
      message = 'Draw!';
   } else if (gameState) {
      message = turn + " turn";
   }

   return (
      <div className="App">
         {/* <h1 id="title">TicTacToe</h1> */}
         <div className="App__container">
            <div id="header">
               <div id="message">{message}</div>
               <div title="Restart Game" className="refresh-ico" onClick={ startNewGame }></div>
            </div>
            <Board grid={ grid }
               setCell={ setCell }
               startNextRound={ startNextRound } />
            <Stats stats={ stats }
               player={ player }
               selectPlayer={ selectPlayer } />
         </div>
      </div>
   );
}

export default App;
