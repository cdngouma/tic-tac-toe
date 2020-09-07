import React from 'react';
import './Stats.css';

function ScoreBar(props) {
   return (
      <div className='Stats'>
         <div id="cross-score" className={`score-box ${props.player==='X'?'selected':''}`}
            onClick={ props.selectPlayer }>
            <span className="score-symbol">X</span>
            <span className="score-value">{ props.stats['X'] }</span>
         </div>
         <div id="round-score" className={`score-box ${props.player==='O'?'selected':''}`}
            onClick={ props.selectPlayer }>
            <span className="score-symbol">O</span>
            <span className="score-value">{ props.stats['O'] }</span>
         </div>
      </div>
   );
}

export default ScoreBar;