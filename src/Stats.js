import React from 'react';
import './Stats.css';

function Stats(props) {
   const human = props.players.human;
   const ai = props.players.ai;
   return (
      <div className='Stats'>
         <div className="score-box"
            onClick={props.changePlayer}>
            <span className="score-label">Player ({human})</span>
            <span className="score-value">{props.stats[human]}</span>
         </div>
         <div className="score-box">
            <span className="score-label">Ties</span>
            <span className="score-value">{props.stats['ties']}</span>
         </div>
         <div className="score-box">
            <span className="score-label">Computer ({ai})</span>
            <span className="score-value">{props.stats[ai]}</span>
         </div>
      </div >
   );
}

export default Stats;