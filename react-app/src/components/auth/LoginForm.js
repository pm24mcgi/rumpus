import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import Demo from './Demo'
import '../../css/errors.css'

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
    <>
      <form onSubmit={onLogin}>
        <div>
          {validationErrors.length > 0 && submitted && validationErrors.map((error, ind) => (
            <div key={ind} className='ErrorDiv'>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <button type='submit'>Login</button>
        </div>
      </form>
      <Demo />
    </>
  );
};

export default LoginForm;
