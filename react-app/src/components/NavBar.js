
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import PostTask from '../components/tasks/postTasks'
import '../css/main.css'

const NavBar = () => {
  return (
    <nav className='NavBarContainer'>
      <NavLink to='/' exact={true} activeClassName='active' className='NavBarElement'>
        Home
      </NavLink>
      <NavLink to='/login' exact={true} activeClassName='active' className='NavBarElement'>
        Login
      </NavLink>
      <NavLink to='/sign-up' exact={true} activeClassName='active' className='NavBarElement'>
        Sign Up
      </NavLink>
      <NavLink to='/users' exact={true} activeClassName='active' className='NavBarElement'>
        Users
      </NavLink>
      <PostTask />
      <LogoutButton />
    </nav>
  );
}

export default NavBar;
