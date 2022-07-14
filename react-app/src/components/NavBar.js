
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import { BsPlusLg } from 'react-icons/bs'
import '../css/main.css'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
    <>
      <nav className='NavBarContainer'>
        {/* <NavLink to='/' exact={true} activeClassName='active' className='NavBarElement'>
          Home
        </NavLink> */}
        <NavLink to='/tasks' exact={true} activeClassName='active' className='NavBarElement'>
          <BsPlusLg />
        </NavLink>
        <LogoutButton />
      </nav>
    </>)
  } else {
    sessionLinks = (
    <>
      <nav className='NavBarContainer'>
        <NavLink to='/splash' exact={true} activeClassName='active' className='NavBarElement'>
          Home
        </NavLink>
        <NavLink to='/login' exact={true} activeClassName='active' className='NavBarElement'>
          Login
        </NavLink>
        <NavLink to='/sign-up' exact={true} activeClassName='active' className='NavBarElement'>
          Sign Up
        </NavLink>
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
