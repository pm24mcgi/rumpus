import React from 'react';
import Splash1 from '../images/splashpage/splash1.png'
import Splash2 from '../images/splashpage/splash2.png'
import Splash3 from '../images/splashpage/splash3.png'
import '../css/splash.css'

function Splash() {
  return (
    <div className='SplashPageContainer'>
      <h1>Splash Page</h1>
      <img src={Splash1} className='SplashImgLarge'></img>
      <img src={Splash2} className='SplashImgSmall'></img>
      <img src={Splash3} className='SplashImgSmall'></img>
    </div>
  )
}

export default Splash;
