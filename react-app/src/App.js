import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import MainRoutes from './components/main/main';
import Splash from './components/Splash';
import PostTask from './components/tasks/postTasks';
import PostProjects from './components/projects/postProjects';
import EditProjects from './components/projects/editProjects';
import PostTaskProject from './components/tasks/postTasksProject';
import PageNotFound from './components/PageNotFound';
import { getProjects } from './store/projects';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getProjects());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
      <Route path='/splash' exact={true}>
          <Splash />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path={['/', '/projects/:project_id', '/today', '/upcoming']} exact={true} >
          <MainRoutes />
        </ProtectedRoute>
        <ProtectedRoute path='/tasks' exact={true} >
          <PostTask />
        </ProtectedRoute>
        <ProtectedRoute path='/tasks/:project_id' exact={true} >
          <PostTaskProject />
        </ProtectedRoute>
        <ProtectedRoute path='/projects' exact={true} >
          <PostProjects />
        </ProtectedRoute>
        <ProtectedRoute path='/projects/:project_id/edit' exact={true} >
          <EditProjects />
        </ProtectedRoute>
        <PageNotFound />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
