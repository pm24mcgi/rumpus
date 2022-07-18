
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import { BsPlusLg } from 'react-icons/bs'
import { AiOutlineHome } from 'react-icons/ai'
import MainLogo from '../images/Rumpus Logo.png'
import SmallLogo from '../images/LogoOnly.png'
import '../css/main.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
    <>
      <nav className='NavBarContainerSessionUser'>
        <NavLink to='/' exact={true} className='HomeButtonSessionUser'>
          <AiOutlineHome size={25}/>
        </NavLink>
        <div className='NavBarCompSessionUser'>
          <div className='NavBarCompSessionUser'>
            <NavLink to='/tasks' exact={true} activeClassName='active' className='NavBarElement NavBarNavLink'>
              <BsPlusLg />
            </NavLink>
          </div>
          <div className='NavBarCompSessionUser'>
            <LogoutButton />
          </div>
        </div>
      </nav>
    </>)
  } else {
    sessionLinks = (
    <>
      <nav className='NavBarContainer'>
        <div className='NavBarComp'>
          <NavLink to='/splash' exact={true} className='NavBarElement'>
            <img src={MainLogo} alt="MainLogo" className='MainLogoSplashNav'></img>
          </NavLink>
        </div>
        <div className='NavBarRightContainer NavBarComp'>
          <div className='NavBarCompRight'>
            <NavLink to='/login' exact={true} className='NavBarElementLeft'>
              <button className='NavBarCompButton Login'>
                Login
              </button>
            </NavLink>
          </div>
          <div className='NavBarCompRight'>
            <NavLink to='/sign-up' exact={true} className='NavBarElementRight'>
              <button className='NavBarCompButton Signup'>
                Start for free
              </button>
            </NavLink>
          </div>
        </div>
        {/* <NavLink to='/users' exact={true} activeClassName='active' className='NavBarElement'>
          Users
        </NavLink> */}
      </nav>
    </>)
  }

  return (
    <div>
      {sessionLinks}
    </div>
  );
}

export default NavBar;
