import React from 'react';
import './Board.css';

function Board(props) {
   const cells = props.grid.map((value, id) => {
      let classNames = 'cell';
      if(value==='O') classNames += ' round-cell used';
      else if(value==='X') classNames += ' cross-cell used';

      return (
         <div id={`cell-${id}`} key={id} disabled={value!==''} value={id}
            className={ classNames }
            onClick={ props.setCell }>{ value }</div>
      )
   });

   return (
      <div className='Board'>{cells}</div>
   );
}

export default Board;