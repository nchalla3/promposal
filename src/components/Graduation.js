import React from 'react';
import grad1 from '../images/graduation/kalandellagrad.jpg';
import grad2 from '../images/graduation/uwlogo.jpg';
import grad3 from '../images/graduation/grad3.jpg';
import grad4 from '../images/graduation/grad4.jpg';

const Graduation = () => {
  return (    <div className="graduation-container">
      <h1 className="graduation-header">HAPPY GRADUATION!!! 🎓🎓🎓</h1>
      <img src={grad1} alt="grad1" className="graduation-image1" />
      <img src={grad2} alt="grad2" className="graduation-image2" />
      <img src={grad3} alt="grad3" className="graduation-image3" />
      <img src={grad4} alt="grad4" className="graduation-image4" />
    </div>
  );
};

export default Graduation;
