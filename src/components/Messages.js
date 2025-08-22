import React, { useState, useEffect } from 'react';

// Import random Ella images
import ellapuppy from '../images/randomella/ellapuppy.png';
import ellagobi from '../images/randomella/ellagobi.png';
import ellapizza from '../images/randomella/ellapizza.png';
import ellaprom from '../images/randomella/ellaprom.png';
import ellasunnies from '../images/randomella/ellasunnies.png';

const Messages = ({ onPromposalClick, onBirthdayClick, onGraduationClick }) => {
  const [realQuotes, setRealQuotes] = useState([]);
  const [fakeQuotes, setFakeQuotes] = useState([]);
  const [currentPair, setCurrentPair] = useState({ real: '', fake: '' });
  const [feedback, setFeedback] = useState({ quote: '', status: null }); // status can be 'correct' or 'incorrect'
  const [quoteOrder, setQuoteOrder] = useState([]); // To randomize quote position
  const [randomImages, setRandomImages] = useState([]);

  const generateNewQuotePair = () => {
    if (realQuotes.length === 0 || fakeQuotes.length === 0) return;

    const realQuote = realQuotes[Math.floor(Math.random() * realQuotes.length)];
    const fakeQuote = fakeQuotes[Math.floor(Math.random() * fakeQuotes.length)];
    setCurrentPair({ real: realQuote, fake: fakeQuote });
    
    // Randomly determine quote order
    setQuoteOrder(Math.random() < 0.5 ? ['real', 'fake'] : ['fake', 'real']);
  };

  useEffect(() => {
    // Set random images when component mounts
    const ellaImages = [
      ellapuppy, 
      ellagobi,
      ellapizza,
      ellaprom,
      ellasunnies
    ];
    
    const getRandomImages = () => {
      const shuffled = [...ellaImages].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    };
    setRandomImages(getRandomImages());
    
    const loadQuotes = async () => {
      try {
        // Load both real and fake quotes
        const [realResponse, fakeResponse] = await Promise.all([
          fetch(process.env.PUBLIC_URL + '/misc/quotes.csv'),
          fetch(process.env.PUBLIC_URL + '/misc/fakequotes.csv')
        ]);

        const [realText, fakeText] = await Promise.all([
          realResponse.text(),
          fakeResponse.text()
        ]);

        // Parse quotes function - uses newlines as separators and removes trailing commas
        const parseQuotes = (text) => {
          const lines = text.split('\n')
            .filter(line => line.trim().length > 0);
          // Ensure there are no trailing commas or extra whitespace
          return lines
            .slice(1)  // Skip header
            .map(line => line.trim().replace(/,+$/, '')); // Remove any trailing commas
        };

        const parsedRealQuotes = parseQuotes(realText);
        const parsedFakeQuotes = parseQuotes(fakeText);

        setRealQuotes(parsedRealQuotes);
        setFakeQuotes(parsedFakeQuotes);

        // Generate initial pair
        if (parsedRealQuotes.length > 0 && parsedFakeQuotes.length > 0) {
          const realQuote = parsedRealQuotes[Math.floor(Math.random() * parsedRealQuotes.length)];
          const fakeQuote = parsedFakeQuotes[Math.floor(Math.random() * parsedFakeQuotes.length)];
          setCurrentPair({ real: realQuote, fake: fakeQuote });
          setQuoteOrder(Math.random() < 0.5 ? ['real', 'fake'] : ['fake', 'real']);
        }
      } catch (error) {
        console.error('Error loading quotes:', error);
      }
    };

    loadQuotes();
  }, []);
  // Generate initial pair when quotes are loaded
  useEffect(() => {
    if (realQuotes.length > 0 && fakeQuotes.length > 0) {
      // Generate initial pair directly without using generateNewQuotePair
      const realQuote = realQuotes[Math.floor(Math.random() * realQuotes.length)];
      const fakeQuote = fakeQuotes[Math.floor(Math.random() * fakeQuotes.length)];
      setCurrentPair({ real: realQuote, fake: fakeQuote });
      setQuoteOrder(Math.random() < 0.5 ? ['real', 'fake'] : ['fake', 'real']);
    }
  }, [realQuotes, fakeQuotes]);

  const handleQuoteClick = (isReal) => {
    if (feedback.status) return; // Prevent clicking during feedback

    const clickedQuote = isReal ? currentPair.real : currentPair.fake;
    const newFeedback = {
      quote: clickedQuote,
      status: isReal ? 'correct' : 'incorrect'
    };
    setFeedback(newFeedback);

    // Reset feedback and generate new quotes after 2 seconds
    setTimeout(() => {
      setFeedback({ quote: '', status: null });
      generateNewQuotePair();
    }, 2000);
  };

  const renderQuoteButton = (quote, isReal) => {
    const isClicked = feedback.quote === quote;
    const buttonClass = `quote-button ${
      isClicked ? (feedback.status === 'correct' ? 'correct' : 'incorrect') : ''
    }`.trim();

    return (
      <button
        onClick={() => handleQuoteClick(isReal)}
        className={buttonClass}
        disabled={!!feedback.status}
      >
        {isClicked ? feedback.status.toUpperCase() : quote}
      </button>
    );
  };

  return (
    <div className="messages-container">
      <h1 className="messages-header">Messages to Ella</h1>
      <div className="random-images-container">
        {randomImages.map((imageSource, index) => (
          <img
            key={index}
            src={imageSource}
            alt={`Ella ${index + 1}`}
            className="random-ella-image"
          />
        ))}
      </div>
      <div className="quote-game-container">
        <h2 className="quote-game-title">Which quote is real?</h2>
        <div className="quote-buttons-container">
          {quoteOrder.map((type) => (
            <div key={type}>
              {renderQuoteButton(
                currentPair[type],
                type === 'real'
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="messages-buttons">
        <button className="message-button promposal" onClick={onPromposalClick}>
          Promposal 💝
        </button>
        <button className="message-button birthday" onClick={onBirthdayClick}>
          Birthday 🎂
        </button>
        <button className="message-button graduation" onClick={onGraduationClick}>
          Graduation 🎓
        </button>
      </div>
    </div>
  );
};

export default Messages;
