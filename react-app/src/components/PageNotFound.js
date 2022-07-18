import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react'
import notFoundImg from '../images/404.png'
import '../css/PageNotFound.css'

function PageNotFound() {
  let history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/');
    }, 4000)
  }, [])

  return (
    <div className="NotFoundContainer">
      <div className="NotFoundInternal">
        <p>We can't seem to find the page you're looking for.</p>
        <p>Don't worry, we'll redirect you!</p>
        <p className='NotFoundInternalbold'>Error Code: 404</p>
      </div>
      <img src={notFoundImg} alt="PageNotFound"></img>
    </div>
  )
}


export default PageNotFound;
