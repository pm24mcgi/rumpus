import { Switch, Route } from "react-router-dom";

import GetProjects from '../projects/getProjects'
import PostProjects from '../projects/postProjects'


function MainRoutes() {


  return (
    <>
      <h1>Main Page With Blended Routes</h1>
      <Switch>
        <Route path='/' exact ={true}>
          <GetProjects />
          <PostProjects />
        </Route>
        <Route path='/projects/:project_id' >
          <GetProjects />
          <PostProjects />
        </Route>
      </Switch>
    </>
  )
}

export default MainRoutes;
