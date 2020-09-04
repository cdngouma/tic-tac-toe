import React from 'react';
import './App.css';

import Board from './Board';

function App() {
   const [turn, setTurn] = React.useState('circle');
   const [grid, setGrid] = React.useState([]);

   React.useEffect(initBoard, []);

   function initBoard() {
      let tmp_grid = [];
      const SIZE = 3;
      for (let i = 0; i < SIZE * SIZE; i++) {
         tmp_grid.push('');
      }
      setGrid(tmp_grid);
   }

   function setCell(event) {
      if (event.target.textContent !== '') {
         return;
      }
      const position = event.target.id.slice(-1);
      let tmp_grid = [...grid];
      tmp_grid[position] = turn === 'circle' ? 'O' : 'X';
      setTurn(turn === 'circle' ? 'cross' : 'circle');
      setGrid(tmp_grid);

   }

   return (
      <div className="App">
         <h1 id="title">TicTacToe</h1>
         <Board grid={grid}
            setCell={setCell} />
      </div>
   );
}

export default App;
