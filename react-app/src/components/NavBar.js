
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import { BsPlusLg } from 'react-icons/bs'
import { AiOutlineHome } from 'react-icons/ai'
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
          <button className='NavBarCompButton'>
            <NavLink to='/splash' exact={true} className='NavBarElement'>
              Home
            </NavLink>
          </button>
        </div>
        <div className='NavBarComp'>
          <button className='NavBarCompButton'>
            <NavLink to='/login' exact={true} className='NavBarElement'>
              Login
            </NavLink>
          </button>
        </div>
        <div className='NavBarComp'>
          <button className='NavBarCompButton'>
            <NavLink to='/sign-up' exact={true} className='NavBarElement'>
              Sign Up
            </NavLink>
          </button>
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
