import React from 'react';
import bluey from '../images/promposal/bluey.png';
import bandit from '../images/promposal/bandit.png';
import chili from '../images/promposal/chili.png';
import bingo from '../images/promposal/bingo.png';
import naveen1 from '../images/promposal/naveen1.png';

const PromPosal = ({ onYesClick, noPosition, onNoClick }) => {
  return (
    <>
      <h1 className="speech">Will you go to prom with me?</h1>
      <img src={bluey} alt="Bluey" className="bluey" />
      <img src={bandit} alt="Bandit" className="bandit" />
      <img src={chili} alt="Chili" className="chili" />
      <img src={bingo} alt="Bingo" className="bingo" />
      <img src={naveen1} alt="Naveen1" className="naveen1" />
      <button className="yes-button" onClick={onYesClick}>
        Yes ❤️🫶
      </button>
      <button
        className="no-button"
        onClick={onNoClick}
        style={{
          position: 'absolute',
          top: noPosition.top,
          left: noPosition.left,
        }}
      >
        No 🥀💔
      </button>
    </>
  );
};

export default PromPosal;
