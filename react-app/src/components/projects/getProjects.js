import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getProjects } from '../../store/projects';
import Collapsible from 'react-collapsible';
import { BsThreeDots } from 'react-icons/bs';
import { HiOutlinePencilAlt } from 'react-icons/hi'
import '../../css/main.css'

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
          <div className='ProjectNavLinksWithEdit' key={project.id}>
            {(sessionUser.id === project.user_id) &&
            <NavLink style={{ textDecoration: 'none' }} to={`/projects/${project.id}`} className='ProjectNavLinkText nav-entry' activeClassName='ProjectNavLinkText nav-entry is-selected'>
              <div className='ProjectMainWithColor'>
                <div className='ProjectColorDisplay' style={{backgroundColor: `${project.color}`}}></div>
                {project.title}
              </div>
            </NavLink>}
            {(sessionUser.id === project.user_id) &&
            <div className='ProjectEditDots'>
              <Collapsible trigger={<BsThreeDots />} transitionTime={0.1}>
                <NavLink to={`/projects/${project.id}/edit`}>
                  <HiOutlinePencilAlt />
                </NavLink>
              </Collapsible>
            </div>}
          </div>
        )
      })}
    </div>
  )
}

export default GetProjects;
