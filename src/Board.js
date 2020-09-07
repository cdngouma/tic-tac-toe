import React from 'react';
import './Board.css';

function Board(props) {
   const cells = props.grid.map((element, id) => {
      let classNames = 'cell';
      if (element.val === 'O') {
         classNames += ' round-cell';
      } else if (element.val === 'X') {
         classNames += ' cross-cell';
      }

      if (element.state === 'used') {
         classNames += ' used';
      } else if (element.state === 'winner') {
         classNames += ' winner breath-fast';
      }

      return (
         <div id={`cell-${id}`} key={id}
            className={classNames}
            onClick={props.setCell}>{element.val}</div>
      )
   });

   return (
      <div className='Board' onClick={ props.startNextRound }>{cells}</div>
   );
}

export default Board;