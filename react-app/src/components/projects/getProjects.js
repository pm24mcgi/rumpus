import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getProjects } from '../../store/projects';
import Collapsible from 'react-collapsible';
import { BsThreeDots } from 'react-icons/bs';
import { HiOutlinePencilAlt } from 'react-icons/hi'
import EditProjects from './editProjects';
import DeleteProjects from './deleteProjects';
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
            <NavLink style={{ textDecoration: 'none' }} to={`/projects/${project.id}`} className=
            {Number.parseInt(projectId) === project.id
              ? "nav-entry is-selected"
              : "nav-entry"}>
                <div className='ProjectNavLinkText'>
                  {project.title}
                </div>
            </NavLink>}
            {(sessionUser.id === project.user_id) &&
            <div className='ProjectEditDots'>
              <Collapsible trigger={<BsThreeDots />} transitionTime={0.1}>
                <HiOutlinePencilAlt />
              </Collapsible>
            </div>}
          </div>
        )
      })}
    </div>
  )
}

export default GetProjects;
