import React, { useState } from 'react';
import './App.css';

function App() {
  const [saidYes, setSaidYes] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: '70%', left: '40%' });

  const moveNoButton = () => {
    const top = `${Math.random() * 80}%`;
    const left = `${Math.random() * 80}%`;
    setNoPosition({ top, left });
  };

  return (
    <div className="app-container">
      {!saidYes ? (
        <>
          <h1 className="speech">Will you go to prom with me?</h1>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/6/69/Bluey_%28Disney%2B%29.png"
            alt="Bluey"
            className="bluey"
          />
          <button className="yes-button" onClick={() => setSaidYes(true)}>
            Yes 💖
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
            No 🙈
          </button>
        </>
      ) : (
        <div className="celebration">
          <h1>YAY! 🎉 Can't wait for prom! 💃🕺</h1>
          <img
            src="https://media.giphy.com/media/Ih2vFzWnRlt4TqICa9/giphy.gif"
            alt="Happy Bluey"
            className="bluey"
          />
        </div>
      )}
    </div>
  );
}

export default App;
