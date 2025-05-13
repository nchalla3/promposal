import React, { useState } from 'react';
import './App.css';
import bluey from './images/bluey.png';
import blueyhappy from './images/blueyhappy.gif';
import bandit from './images/bandit.png';
import chili from './images/chili.png';

function App() {
  const [saidYes, setSaidYes] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: '47%', left: '53%' });

  const moveNoButton = () => {
    const top = `${Math.random() * 80}%`;
    const left = `${Math.random() * 80}%`;
    setNoPosition({ top, left });
  };

  return (
    <div className={`app-container ${saidYes ? 'celebrate-bg' : ''}`}>
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


          
          <button className="yes-button" onClick={() => setSaidYes(true)}>
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
      ) : (
        <div className="celebration">
          <h1>YIPPEE! Can't wait for prom! 💃🕺</h1>
          <img
            src={blueyhappy}
            alt="Happy Bluey"
            className="bluey-happy"
          />
        </div>
      )}
    </div>
  );
}

export default App;
