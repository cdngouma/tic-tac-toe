import React from 'react';
import './Header.css';

function Header(props) {
   return (
      <div className="Header">
         <div title="Restart Game" className="refresh-ico" onClick={props.newGame}></div>
         <div id="message">{props.message}</div>
         <button id="continue" disabled={props.continue} onClick={props.nextRound}>Continue</button>
      </div>
   );
}

export default Header;