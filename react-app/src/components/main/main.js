import React from 'react';
import { Switch, Route, NavLink } from "react-router-dom";
import Collapsible from 'react-collapsible';
import GetProjects from '../projects/getProjects';
import GetTasks from '../tasks/getTasks';
import AllTasks from '../tasks/AllTasks';
import TodayTasks from '../tasks/TodayTasks';
import UpcommingTasks from '../tasks/UpcomingTasks';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { BsPlusLg } from 'react-icons/bs'
import { AiOutlineHome } from 'react-icons/ai'
import { CgToday } from 'react-icons/cg'
import { MdCalendarToday } from 'react-icons/md'
import '../../css/main.css'

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
        <BsPlusLg size={13}/>
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
      <div className='LeftBarNavigation'>
        <Switch>
          <Route path='/' exact ={true}>
            <div className='TopBarNavigators'>
              <NavLink to='/' exact={true} className='ProjectNavLinkText nav-entry' activeClassName='ProjectNavLinkText nav-entry is-selected'>
                <AiOutlineHome style={{color: '#d1453b'}}/>
                All Tasks
              </NavLink>
              <NavLink to='/today' exact={true} className='ProjectNavLinkText nav-entry' activeClassName='ProjectNavLinkText nav-entry is-selected'>
                <CgToday style={{color: '#068b06'}}/>
                Today
              </NavLink>
              <NavLink to='/upcoming' exact={true} className='ProjectNavLinkText nav-entry' activeClassName='ProjectNavLinkText nav-entry is-selected'>
                <MdCalendarToday style={{color: '#d1453b'}}/>
                Upcoming
              </NavLink>
            </div>
            <div className='ProjectContainer'>
              <div className='CollapsibleElements'>
                <Collapsible trigger={trigger} triggerWhenOpen={triggerWhenOpen} transitionTime={75} open={true}>
                  <GetProjects />
                  <AllTasks />
                </Collapsible>
              </div>
            </div>
          </Route>
          <Route path='/today' exact ={true}>
            <div className='TopBarNavigators'>
              <NavLink to='/' exact={true} className='ProjectNavLinkText nav-entry' activeClassName='ProjectNavLinkText nav-entry is-selected'>
                <AiOutlineHome />
                All Tasks
              </NavLink>
              <NavLink to='/today' exact={true} className='ProjectNavLinkText nav-entry' activeClassName='ProjectNavLinkText nav-entry is-selected'>
                <CgToday />
                Today
              </NavLink>
              <NavLink to='/upcoming' exact={true} className='ProjectNavLinkText nav-entry' activeClassName='ProjectNavLinkText nav-entry is-selected'>
                <MdCalendarToday />
                Upcoming
              </NavLink>
            </div>
            <div className='ProjectContainer'>
              <div className='CollapsibleElements'>
                <Collapsible trigger={trigger} triggerWhenOpen={triggerWhenOpen} transitionTime={75} open={true}>
                  <GetProjects />
                  <TodayTasks />
                </Collapsible>
              </div>
            </div>
          </Route>
          <Route path='/upcoming' exact ={true}>
            <div className='TopBarNavigators'>
              <NavLink to='/' exact={true} className='ProjectNavLinkText nav-entry' activeClassName='ProjectNavLinkText nav-entry is-selected'>
                <AiOutlineHome />
                All Tasks
              </NavLink>
              <NavLink to='/today' exact={true} className='ProjectNavLinkText nav-entry' activeClassName='ProjectNavLinkText nav-entry is-selected'>
                <CgToday />
                Today
              </NavLink>
              <NavLink to='/upcoming' exact={true} className='ProjectNavLinkText nav-entry' activeClassName='ProjectNavLinkText nav-entry is-selected'>
                <MdCalendarToday />
                Upcoming
              </NavLink>
            </div>
            <div className='ProjectContainer'>
              <div className='CollapsibleElements'>
                <Collapsible trigger={trigger} triggerWhenOpen={triggerWhenOpen} transitionTime={75} open={true}>
                  <GetProjects />
                  <UpcommingTasks />
                </Collapsible>
              </div>
            </div>
          </Route>
          <Route path='/projects/:project_id' >
            <div className='TopBarNavigators'>
              <NavLink to='/' exact={true} className='ProjectNavLinkText nav-entry' activeClassName='ProjectNavLinkText nav-entry is-selected'>
                <AiOutlineHome />
                All Tasks
              </NavLink>
              <NavLink to='/today' exact={true} className='ProjectNavLinkText nav-entry' activeClassName='ProjectNavLinkText nav-entry is-selected'>
                <CgToday />
                Today
              </NavLink>
              <NavLink to='/upcoming' exact={true} className='ProjectNavLinkText nav-entry' activeClassName='ProjectNavLinkText nav-entry is-selected'>
                <MdCalendarToday />
                Upcoming
              </NavLink>
            </div>
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
    </div>
  )
}

export default MainRoutes;
