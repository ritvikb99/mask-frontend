import React, { useEffect } from 'react';
import './Home.css';
import img from './home_img.png';

function Home() {
  useEffect(() => {
    const img = document.getElementById('img');
    /* img.style.width = '50vw';
    img.style.height = '28vw'; */
    img.style.transform = 'scale(3.8)';
  });
  return (
    <div id='main'>
      <div className='title'>
        <h1>Face Mask Detector</h1>
      </div>
      <div className='image'>
        <img src={img} id='img' alt='home_img' />
      </div>
    </div>
  );
}

export default Home;
