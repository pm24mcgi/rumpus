import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { postProject } from '../../store/projects';
import '../../css/errors.css';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [submitted, setSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState([]);
  const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

  useEffect(() => {
    const errors = [];
    if (firstName.length === 0) errors.push("Please provide a first name");
    if (firstName.length >= 50) errors.push("First name must be less than 50 characters");
    if (LastName.length === 0) errors.push("Please provide a last name");
    if (LastName.length >= 50) errors.push("Last name must be less than 50 characters");
    if (username.length === 0) errors.push("Please provide a username");
    if (username.length >= 40) errors.push("Username must be less than 40 characters");
    if (email.length === 0) errors.push("Please provide a valid email address");
    if (email.length >= 255) errors.push("Email address must be less than 50 characters");
    if (!emailRegex.test((email))) errors.push("Must provide a valid email address.");
    if (password.length === 0) errors.push("Please provide a password");
    if (password.length >= 255) errors.push("Password must be less than 255 characters");
    if (!passwordRegex.test((password))) errors.push("Password must be at least 8 characters long, contain one special character, one letter and one number");
    if (repeatPassword !== password) errors.push("The provided password does not match the confirmed password");
    setValidationErrors(errors);
  }, [firstName, LastName, username, email, password, repeatPassword]);

  const onSignUp = async (e) => {
    e.preventDefault();
    setSubmitted(true)

    if (validationErrors.length <= 0) {
      const data = await dispatch(signUp(firstName, LastName, username, email, password));
      if (data) {
        setValidationErrors(data)
      }
      if (validationErrors.length <= 0) {
        const payload = {
          title: 'Personal',
          color: '#008080',
          favorite: false
        };
        dispatch (postProject(payload))
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const updateLastName = (e) => {
    setLastName(e.target.value)
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {validationErrors.length > 0 && submitted && validationErrors.map((error, ind) => (
          <div key={ind} className='ErrorDiv'>{error}</div>
        ))}
      </div>
      <div>
        <label>First Name</label>
        <input
          type='text'
          name='first_name'
          onChange={updateFirstName}
          value={firstName}
        ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type='text'
          name='last_name'
          onChange={updateLastName}
          value={LastName}
        ></input>
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
