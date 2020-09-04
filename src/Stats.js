import React from 'react';
import './Stats.css';

function ScoreBar(props) {
   return (
      <div className='Stats'>
         <div id="cross">
            <span className="score__symbol">X:</span>
            <span className="score__value">{ props.stats['cross'] }</span>
         </div>
         <div id="circle">
            <span className="score__symbol">O:</span>
            <span className="score__value">{ props.stats['circle'] }</span>
         </div>
      </div>
   );
}

export default ScoreBar;