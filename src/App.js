import React from 'react';
import './App.css';

import Header from './Header';
import Board from './Board';
import Stats from './Stats';

import aiMove from './ai_script';

function App() {
   const [board, setBoard] = React.useState([]);
   const [players, setPlayers] = React.useState({});
   const [stats, setStats] = React.useState({});
   const [turn, setTurn] = React.useState('');

   React.useEffect(startNewGame, []);
   React.useEffect(placeAIMove);

   function startNewGame() {
      setPlayers({
         human: 'o',
         ai: 'x'
      });
      setStats({
         'x': 0,
         'o': 0,
         'ties': 0,
         'winner': undefined,
         'starter': 'x'
      });
      setTurn('x');
      resetBoard();
   }

   function resetBoard() {
      let tmp_board = [
         ['_', '_', '_'],
         ['_', '_', '_'],
         ['_', '_', '_']
      ];
      setBoard(tmp_board);
   }

   function startNextRound() {
      if (stats.winner) {
         let tmp_stats = stats;
         const starter = tmp_stats.starter === 'o' ? 'x' : 'o';
         tmp_stats.winner = undefined;
         tmp_stats.starter = starter;
         setTurn(starter);
         resetBoard();
      }
   }

   function changePlayer() {
      /*const ai = players.human;
      const human = players.ai;
      setPlayers({ human: human, ai: ai });
      */
   }

   function placePlayerMove(event) {
      if (stats['winner'] === undefined && turn === players.human) {
         const pos = event.target.id.slice(-1);
         const i = Math.floor(pos / 3);
         const j = pos % 3;
         let tmp_board = [...board];
         tmp_board[i][j] = players.human;
         setBoard(tmp_board);
         const winner = checkWinner();
         if (winner) {
            setWinner(winner);
         }
         setTurn(players.ai);
      }
   }

   function placeAIMove() {
      if (stats['winner'] === undefined && turn === players.ai) {
         let { i, j } = aiMove([...board], players);
         let tmp_board = [...board];
         tmp_board[i][j] = players.ai;
         setBoard(tmp_board);
         const winner = checkWinner();
         if (winner) {
            setWinner(winner);
         }
         setTurn(players.human);
      }
   }

   function setWinner(winner) {
      let tmp_stats = stats;
      stats[winner]++;
      stats['winner'] = winner;
      setStats(tmp_stats);
   }

   function checkWinner() {
      // Check ny rows
      for (let i = 0; i < 3; i++) {
         if (board[i][0] !== '_' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            //setWinnerIndexes(new Set([i, 3 * i + 1, 3 * i + 2]));
            return board[i][0];
         }
      }
      // Check by columns
      for (let i = 0; i < 3; i++) {
         if (board[0][i] !== '_' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            //setWinnerIndexes(new Set([i, i + 3, 6 + i]));
            return board[0][i];
         }
      }
      // Check by diagonals
      if (board[0][0] !== '_' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
         //setWinnerIndexes(new Set([0, 5, 8]));
         return board[0][0];
      }
      if (board[2][0] !== '_' && board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
         //setWinnerIndexes(new Set([6, 5, 2]));
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
         return 'ties';
      }
      return undefined;
   }

   const boardElements = board.map((row, i) => {
      return row.map((value, j) => {
         const id = i * 3 + j;
         let classNames = ['cell'];
         if (value === '_') {
            value = '';
         } else if (value[value.length - 1] === '*') {
            value = value[0];
            classNames.push(["highlight"]);
         }

         if (value[0] === 'o' || value[0] === 'x') {
            classNames.push([`${value[0]}-cell`]);
         }

         return (<div key={id}
            id={"cell-" + id}
            className={classNames.join(" ")}
            onClick={placePlayerMove}>{value}</div>)
      });
   });

   const message = (!stats.winner ? turn.toUpperCase() + " turn" : (
      stats.winner !== 'ties' ? stats.winner.toUpperCase() + " won!" : "Draw!"
   ))

   return (
      <div className="App">
         <div className="App__container">
            <Header newGame={startNewGame}
               nextRound={startNextRound}
               message={message}
               continue={stats.winner === undefined} />
            <Board boardElements={boardElements} />
            <Stats players={players}
               stats={stats}
               changePlayer={changePlayer} />
         </div>
      </div>
   );
}

export default App;
