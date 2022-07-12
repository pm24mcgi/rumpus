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
    <div className='MainContainer'>
      <Switch>
        <Route path='/' exact ={true}>
          <div className='ProjectContainer'>
            <div className='CollapsibleElements'>
              <Collapsible trigger={<GiHamburgerMenu />} transitionTime={75} open={true}>
                <GetProjects />
                <PostProjects />
              </Collapsible>
            </div>
          </div>
        </Route>
        <Route path='/projects/:project_id' >
          <div className='ProjectDetailMainContainer'>
            <div className='CollapsibleElements'>
              <Collapsible trigger={<GiHamburgerMenu />} transitionTime={75} open={true}>
                <GetProjects />
                <PostProjects />
              </Collapsible>
            </div>
            <GetTasks />
          </div>
        </Route>
      </Switch>
    </div>
  )
}

export default MainRoutes;
