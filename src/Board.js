import React from 'react';
import './Board.css';

function Board(props) {
   const cells = props.grid.map((e, id) => {
      let classNames = 'cell';
      if (e.val === 'O') {
         classNames += ' round-cell ' + e.class;
      } else if (e.val === 'X') {
         classNames += ' cross-cell ' + e.class;
      }

      return (
         <div id={`cell-${id}`} key={id}
            className={classNames}
            onClick={props.setCell}>{e.val}</div>
      )
   });

   return (
      <div className='Board' onClick={ props.startNextRound }>{cells}</div>
   );
}

export default Board;