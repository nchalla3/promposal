import React from 'react';
import dog1 from '../images/birthday/dog1.jpg';
import dog2 from '../images/birthday/dog2.jpg';
import dog3 from '../images/birthday/dog3.jpg';

const Birthday = () => {
  return (
    <div className="hbday-heading">
      HAPPY BIRTHDAY ELLA 🎉🎂🫶🥰
      <img src={dog1} alt="dog1" className="dog1" />
      <img src={dog2} alt="dog2" className="dog2" />
      <img src={dog3} alt="dog3" className="dog3" />
    </div>
  );
};

export default Birthday;
