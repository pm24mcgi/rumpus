import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getProjects } from '../../store/projects'

const GetProjects = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const projects = Object.values(useSelector(state => state.project))
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch])

  return (
    <div className='ProjectContainer'>
      {projects.map((project) => {
        return(
          (sessionUser.id === project.user_id) &&
          <NavLink key={project.id} to={`/projects/${project.id}`} className=
          {Number.parseInt(projectId) === project.id
            ? "nav-entry is-selected"
            : "nav-entry"}>
              <div className='ProjectNavLinkText'>
                {project.title}
              </div>
          </NavLink>
        )
      })}
    </div>
  )
}

export default GetProjects;
