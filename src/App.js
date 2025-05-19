import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti'; // Import the Confetti component
import './App.css';
import bluey from './images/bluey.png';
import blueyhappy from './images/blueyhappy.gif';
import bandit from './images/bandit.png';
import chili from './images/chili.png';
import bingo from './images/bingo.png';
import naveen1 from './images/naveen1.png';
import naveen2 from './images/naveen2.png';
import naveen3 from './images/naveen3.png';
import naveen4 from './images/naveen4.png';
import naveen5 from './images/naveen5.png';
import naveen6 from './images/naveen6.png';

function App() {
  const [saidYes, setSaidYes] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBirthday, setShowBirthday] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: '42%', left: '53%' });

  const moveNoButton = () => {
    const top = `${Math.random() * 80}%`;
    const left = `${Math.random() * 80}%`;
    setNoPosition({ top, left });
  };

  const handleYesClick = () => {
    setSaidYes(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 10000);
  };

  const handleBirthdayClick = () => {
    setShowBirthday(true);
  };

  return (
    <div className={`app-container ${saidYes ? 'celebrate-bg' : ''}`}>
      {showConfetti && <Confetti />}
      {!saidYes ? (
        <>
          <h1 className="speech">Will you go to prom with me?</h1>
          <img
            src={bluey}
            alt="Bluey"
            className="bluey"
          />

          <img
            src={bandit}
            alt="Bandit"
            className="bandit"
          />

          <img
            src={chili}
            alt="Chili"
            className="chili"
          />

          <img
            src={bingo}
            alt="Bingo"
            className="bingo"
          />
          <img
            src={naveen1}
            alt="Naveen1"
            className="naveen1"
          />
          <button className="yes-button" onClick={handleYesClick}>
            Yes ❤️🫶
          </button>
          <button
            className="no-button"
            onClick={moveNoButton}
            style={{
              position: 'absolute',
              top: noPosition.top,
              left: noPosition.left,
            }}
          >
            No 🥀💔
          </button>
        </>
      ) : !showBirthday ? (
        <div className="celebration">
          <h1>YIPPEE! Can't wait for prom! 💃🕺</h1>
          <img
            src={blueyhappy}
            alt="Happy Bluey"
            className="bluey-happy"
          />

          <img
            src={naveen2}
            alt="Naveen2"
            className="naveen2"
          />
          <img
            src={naveen3}
            alt="Naveen3"
            className="naveen3"
          />
          <img
            src={naveen4}
            alt="Naveen4"
            className="naveen4"
          />

          <img
            src={naveen5}
            alt="Naveen5"
            className="naveen5"
          />
          
          {/* New Birthday Button */}
          <button
            className="birthday-button"
            onClick={handleBirthdayClick}
            /*style={{
              display: 'block',
              margin: '20px auto',
              padding: '10px 20px',
              fontSize: '1.5vw',
              background: '#ffb347',
              border: '2px solid #404066',
              borderRadius: '10px',
              cursor: 'pointer'
            }}*/
          >
          If you're the most perfect girl<br />in the world, click here! 🎂
          </button>
          
          <img
            src={naveen6}
            alt="Naveen6"
            className="naveen6"
          />
        </div>
      ) : (
        <div className="hbday-heading">
            HAPPY BIRTHDAY ELLA 🎉🎂🫶🥰
        </div>
      )}
    </div>
  );
}

export default App;
