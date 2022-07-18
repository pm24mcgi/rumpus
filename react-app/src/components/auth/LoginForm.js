import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import Demo from './Demo'
import '../../css/errors.css'
import '../../css/login.css'

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (email.length === 0) errors.push("Email address field is empty");
    if (password.length === 0) errors.push("Password field is empty");
    setValidationErrors(errors);
  }, [email, password]);

  const onLogin = async (e) => {
    e.preventDefault();
    setSubmitted(true)

    if (validationErrors.length <= 0) {
      const data = await dispatch(login(email, password));
      if (data) {
        setValidationErrors(data);
      }
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='LoginPage'>
      <p className='LoginPageText'>
        Login
      </p>
      <form onSubmit={onLogin} className='LoginForm'>
        <div>
          {validationErrors.length > 0 && submitted && validationErrors.map((error, ind) => (
            <div key={ind} className='ErrorDiv'>{error}</div>
          ))}
        </div>
        <div className='FormInputField'>
          <label htmlFor='email' className='FormInputFieldText'>Email</label>
          <br></br>
          <input
            name='email'
            type='text'
            placeholder='Enter your email...'
            value={email}
            onChange={updateEmail}
            className='FormInputFieldActual'
          />
        </div>
        <div className='FormInputField'>
          <label htmlFor='password'  className='FormInputFieldText'>Password</label>
          <br></br>
          <input
            name='password'
            type='password'
            placeholder='Enter your password...'
            value={password}
            onChange={updatePassword}
            className='FormInputFieldActual'
          />
          <br></br>
        </div>
        <button type='submit' className='FormSubmitButton'>Login</button>
        <Demo />
      </form>
    </div>
  );
};

export default LoginForm;
