import React from 'react';
import Splash1 from '../images/splashpage/splash1.png'
import Splash2 from '../images/splashpage/splash2.png'
import Splash3 from '../images/splashpage/splash3.png'
import '../css/splash.css'

function Splash() {
  return (
    <>
      <div className='SplashPageContainer'>
        <img src={Splash1} className='SplashImgLarge'></img>
        <img src={Splash2} className='SplashImgSmall'></img>
        <img src={Splash3} className='SplashImgSmall'></img>
      </div>
      <div className='SplashFooter'>
        <a className='FooterLinks' href='https://github.com/pm24mcgi'>GitHub</a>
        <a className='FooterLinks' href='https://github.com/pm24mcgi/rumpus'>Project Repo</a>
        <a className='FooterLinks' href='https://www.linkedin.com/in/patrickmcginn-1358b76b/'>LinkedIn</a>
      </div>
    </>
  )
}

export default Splash;
