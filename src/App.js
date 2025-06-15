import React, { useState, useRef } from 'react';
import Confetti from 'react-confetti';
import './App.css';
import PromPosal from './components/PromPosal';
import Celebration from './components/Celebration';
import Birthday from './components/Birthday';
import Graduation from './components/Graduation';
import hbdmessage from './audio/hbdmessage.m4a';
import pomp from './audio/pomp.mp3';

function App() {
  const birthdayAudioRef = useRef(null);
  const pompAudioRef = useRef(null);
  const [currentPage, setCurrentPage] = useState('promposal');
  const [showConfetti, setShowConfetti] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: '42%', left: '53%' });

  const moveNoButton = () => {
    const top = `${Math.random() * 80}%`;
    const left = `${Math.random() * 80}%`;
    setNoPosition({ top, left });
  };

  const handleYesClick = () => {
    setCurrentPage('celebration');
    triggerConfetti();
  };

  const handleBirthdayClick = () => {
    setCurrentPage('graduation');
    if (pompAudioRef.current) {
      pompAudioRef.current.play();
    }
    triggerConfetti();
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'promposal':
        return (
          <PromPosal
            onYesClick={handleYesClick}
            noPosition={noPosition}
            onNoClick={moveNoButton}
          />
        );
      case 'celebration':
        return <Celebration onBirthdayClick={handleBirthdayClick} />;
      case 'birthday':
        return <Birthday />;
      case 'graduation':
        return <Graduation />;
      default:
        return <PromPosal />;
    }
  };

  return (
    <div className={`app-container ${currentPage !== 'promposal' ? 'celebrate-bg' : ''}`}>
      <audio ref={birthdayAudioRef} src={hbdmessage} />
      <audio ref={pompAudioRef} src={pomp} />
      {showConfetti && <Confetti />}
      {renderCurrentPage()}
    </div>
  );
}

export default App;
