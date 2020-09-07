import React from 'react';
import './Stats.css';

function ScoreBar(props) {
   const player = props.player;
   const cp = props.player==='O' ? 'X':'O';

   return (
      <div className='Stats'>
         <div className="score-box" onClick={ props.selectPlayer }>
            <span>Player ({ player })</span>
            <span className="score-value">{ props.stats[player] }</span>
         </div>
         <div className="score-box" onClick={ props.selectPlayer }>
            <span>Ties</span>
            <span className="score-value">{ props.stats['ties'] }</span>
         </div>
         <div className="score-box">
            <span>Computer ({ cp })</span>
            <span className="score-value">{ props.stats[cp] }</span>
         </div>
      </div>
   );
}

export default ScoreBar;