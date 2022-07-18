import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getProjects } from '../../store/projects';

const ProtectedRoute = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    (async() => {
      await dispatch(getProjects());
    })();
  }, [dispatch]);

  return (
    <Route {...props}>
      {(user)? props.children  : <Redirect to='/splash' />}
    </Route>
  )
};


export default ProtectedRoute;
