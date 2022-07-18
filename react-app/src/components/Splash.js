import React from 'react';
import { NavLink } from 'react-router-dom';
import Splash1 from '../images/splashpage/splash1.png'
import Splash2 from '../images/splashpage/splash2.png'
import Splash3 from '../images/splashpage/splash3.png'
import '../css/splash.css'

function Splash() {
  return (
    <>
      <div className='SplashHeaderTextContainer'>
        <div className='SplashHeaderText'>
          Organize your work and life, finally.
        </div>
        <div className='SplashMainText'>
          Become focused, organized, and calm with Todoist. The world’s #1 task manager and to-do list app.
        </div>
        <div className='NavBarCompRight'>
          <button className='NavBarCompButton Signup SplashMain'>
            <NavLink to='/sign-up' exact={true} className='NavBarElementRight'>
              Start for free
            </NavLink>
          </button>
        </div>
      </div>
      <div className='SplashPageContainer'>
        <div className='SplashPageOne'>
          <img src={Splash1} className='SplashImgLarge'></img>
        </div>
        <div className='SplashPageTwo'>
          <div className='SplashPageTwoText'>
            <div className='SplashPageTwoInternalTop'>GET MORE DONE</div>
            <div className='SplashPageTwoInternalMiddle'>
              Add your tasks.
              <br></br>
              Organize your life.
              <br></br>
              Achieve more every day.
            </div>
            <div className='SplashPageTwoInternalBottom'>Add tasks like “Read work emails every day at 10am” to fill your to-do list in seconds using Todoist’s powerful natural language recognition and recurring dates.</div>
          </div>
          <img src={Splash2} className='SplashImgSmall'></img>
        </div>
        <div className='SplashPageThree'>
          <img src={Splash3} className='SplashImgSmall'></img>
          <div className='SplashPageTwoText'>
            <div className='SplashPageTwoInternalTop'>CLEAR YOUR MIND</div>
            <div className='SplashPageTwoInternalMiddle'>
              Reach that mental clarity
              <br></br>
              you’ve been longing for.
            </div>
            <div className='SplashPageTwoInternalBottom'>Your to-do lists are automatically sorted into Today, Upcoming and custom Filter views to help you focus on your most important things.</div>
          </div>
        </div>
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
