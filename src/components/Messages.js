import React, { useState, useEffect } from 'react';

const Messages = ({ onPromposalClick, onBirthdayClick, onGraduationClick }) => {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const loadQuotes = async () => {
      try {
        // Read the quotes directly from the src/misc folder
        const response = await fetch(process.env.PUBLIC_URL + '/misc/quotes.csv');
        const text = await response.text();
        
        // Parse CSV properly
        const lines = text.split('\n')
          .filter(line => line.trim().length > 0); // Remove empty lines
        
        // Remove header and parse quotes
        const parsedQuotes = lines.slice(1)
          .map(line => {
            const quote = line.split(',')[0].trim();
            // Remove any surrounding quotes
            return quote.replace(/^["']|["']$/g, '');
          })
          .filter(quote => quote && quote.length > 0); // Remove empty quotes
        
        setQuotes(parsedQuotes);
        // Set initial random quote
        const initialQuote = parsedQuotes[Math.floor(Math.random() * parsedQuotes.length)];
        setQuote(initialQuote || '');
      } catch (error) {
        console.error('Error loading quotes:', error);
        setQuotes([]); // Set empty array on error
      }
    };

    loadQuotes();
  }, []);

  const handleNewQuote = () => {
    if (quotes.length === 0) return;
    let newQuote = quote;
    // Make sure we don't get the same quote twice in a row
    while (newQuote === quote && quotes.length > 1) {
      const idx = Math.floor(Math.random() * quotes.length);
      newQuote = quotes[idx];
    }
    setQuote(newQuote);
  };

  return (
    <div className="messages-container">
      <h1 className="messages-header">Messages to Ella</h1>
      <div style={{ margin: '2vh 0', fontSize: '2.5rem', color: '#404066', fontFamily: 'Heyam, cursive', textAlign: 'center', minHeight: '3rem' }}>
        <span style={{ fontStyle: 'italic', fontWeight: 500 }}>&ldquo;{quote}&rdquo;</span>
        <button onClick={handleNewQuote} style={{ marginLeft: '1rem', fontSize: '1.5rem', borderRadius: '10px', border: 'none', background: '#e0e0ff', cursor: 'pointer', padding: '0.3em 1em' }}>↻</button>
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
