import React from 'react';
import { Switch, Route } from "react-router-dom";
import Collapsible from 'react-collapsible';
import GetProjects from '../projects/getProjects';
import PostProjects from '../projects/postProjects';
import GetTasks from '../tasks/getTasks';
import { GiHamburgerMenu } from 'react-icons/gi';
import '../../css/main.css'


// const hamburgerMenuIcon = <GiHamburgerMenu />

function MainRoutes() {


  return (
    <>
      <h1>Main Page With Blended Routes</h1>
      <Switch>
        <Route path='/' exact ={true}>
          <div className='ProjectContainer'>
            <Collapsible trigger={<GiHamburgerMenu />} transitionTime={75} open={true}>
              <GetProjects />
              <PostProjects />
            </Collapsible>
          </div>
        </Route>
        <Route path='/projects/:project_id' >
          <div className='ProjectDetailMainContainer'>
            <Collapsible trigger={<GiHamburgerMenu />} transitionTime={75} open={true}>
              <GetProjects />
              <PostProjects />
            </Collapsible>
            <GetTasks />
          </div>
        </Route>
      </Switch>
    </>
  )
}

export default MainRoutes;
