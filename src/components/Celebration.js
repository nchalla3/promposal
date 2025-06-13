import React from 'react';
import blueyhappy from '../images/blueyhappy.gif';
import naveen2 from '../images/naveen2.png';
import naveen3 from '../images/naveen3.png';
import naveen4 from '../images/naveen4.png';
import naveen5 from '../images/naveen5.png';
import naveen6 from '../images/naveen6.png';

const Celebration = ({ onBirthdayClick }) => {
  return (
    <div className="celebration">
      <h1>YIPPEE! Can't wait for prom! 💃🕺</h1>
      <img src={blueyhappy} alt="Happy Bluey" className="bluey-happy" />
      <img src={naveen2} alt="Naveen2" className="naveen2" />
      <img src={naveen3} alt="Naveen3" className="naveen3" />
      <img src={naveen4} alt="Naveen4" className="naveen4" />
      <img src={naveen5} alt="Naveen5" className="naveen5" />
      <button className="birthday-button" onClick={onBirthdayClick}>
        If you're the most perfect girl<br />in the world, click here! 🎂
      </button>
      <img src={naveen6} alt="Naveen6" className="naveen6" />
    </div>
  );
};

export default Celebration;
