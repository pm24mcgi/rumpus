import React from 'react';
import { Switch, Route, NavLink } from "react-router-dom";
import Collapsible from 'react-collapsible';
import GetProjects from '../projects/getProjects';
import GetTasks from '../tasks/getTasks';
import AllTasks from '../tasks/AllTasks';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { BsPlusLg } from 'react-icons/bs'
import '../../css/main.css'


// const hamburgerMenuIcon = <GiHamburgerMenu />

function MainRoutes() {

  const triggerWhenOpen =
    <div className='TriggerContainer'>
      <div className='TriggerContainerLeft'>
        <MdKeyboardArrowDown />
        <div className='TriggerText'>
          Projects
        </div>
      </div>
      <NavLink to='/projects' exact ={true} className='PostProjectNavLink'>
        <BsPlusLg />
      </NavLink>
    </div>

  const trigger =
    <div className='TriggerContainer'>
      <div className='TriggerContainerLeft'>
        <MdKeyboardArrowRight />
        <div className='TriggerText'>
          Projects
        </div>
      </div>
      <NavLink to='/projects' exact ={true} className='PostProjectNavLink'>
        <BsPlusLg />
      </NavLink>
    </div>


  return (
    <div className='MainContainer'>
      <Switch>
        <Route path='/' exact ={true}>
          <div className='ProjectContainer'>
            <div className='CollapsibleElements'>
              <Collapsible trigger={trigger} triggerWhenOpen={triggerWhenOpen} transitionTime={75} open={true}>
                <GetProjects />
                <AllTasks />
              </Collapsible>
            </div>
          </div>
        </Route>
        <Route path='/projects/:project_id' >
          <div className='ProjectDetailMainContainer'>
            <div className='CollapsibleElements'>
              <Collapsible trigger={trigger} triggerWhenOpen={triggerWhenOpen} transitionTime={75} open={true}>
                <GetProjects />
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
