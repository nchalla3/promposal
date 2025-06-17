import React, { useState, useEffect } from 'react';

const Messages = ({ onPromposalClick, onBirthdayClick, onGraduationClick }) => {
  const [realQuotes, setRealQuotes] = useState([]);
  const [fakeQuotes, setFakeQuotes] = useState([]);
  const [currentPair, setCurrentPair] = useState({ real: '', fake: '' });
  const [feedback, setFeedback] = useState({ quote: '', status: null }); // status can be 'correct' or 'incorrect'
  const [quoteOrder, setQuoteOrder] = useState([]); // To randomize quote position

  const generateNewQuotePair = (realQuotesArr = realQuotes, fakeQuotesArr = fakeQuotes) => {
    if (realQuotesArr.length === 0 || fakeQuotesArr.length === 0) return;

    const realQuote = realQuotesArr[Math.floor(Math.random() * realQuotesArr.length)];
    const fakeQuote = fakeQuotesArr[Math.floor(Math.random() * fakeQuotesArr.length)];
    setCurrentPair({ real: realQuote, fake: fakeQuote });
    
    // Randomly determine quote order
    setQuoteOrder(Math.random() < 0.5 ? ['real', 'fake'] : ['fake', 'real']);
  };
  
  useEffect(() => {
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

        // Parse CSV helper function
        const parseCSV = (text) => {
          const lines = text.split('\n')
            .filter(line => line.trim().length > 0);
          return lines.slice(1)
            .map(line => {
              const quote = line.split(',')[0].trim();
              return quote.replace(/^["']|["']$/g, '');
            })
            .filter(quote => quote && quote.length > 0);
        };

        const parsedRealQuotes = parseCSV(realText);
        const parsedFakeQuotes = parseCSV(fakeText);

        setRealQuotes(parsedRealQuotes);
        setFakeQuotes(parsedFakeQuotes);

        // Generate initial pair
        generateNewQuotePair(parsedRealQuotes, parsedFakeQuotes);
      } catch (error) {
        console.error('Error loading quotes:', error);
      }
    };

    loadQuotes();
  }, []);

  

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
      <h1 className="messages-header">Messages to Ella</h1>      <div className="quote-game-container">
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
