import React from 'react';
import './Board.css';

function Board(props) {
   return (
      <div className='Board'>
         {props.boardElements}
      </div>
   );
}

export default Board;