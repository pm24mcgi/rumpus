import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getTasks } from '../../store/tasks'
import { BsPlusLg } from 'react-icons/bs'


const GetTasks = () => {
  const dispatch = useDispatch();
  const tasks = Object.values(useSelector(state => state.task))
  const projects = Object.values(useSelector(state => state.project))
  const { project_id } = useParams();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch])

  const project = projects.filter((e) => e.id == project_id)

  tasks.sort((objA, objB) => {
    if (new Date(objA.due_date).getTime() > new Date(objB.due_date).getTime()) {
      return 1
    } else {
      return -1
    }
  });

  return(
    <div className='TaskContainer'>
      <div className='TaskContainerInternal'>
        <div className='TaskContainerProjectDescription'>
          {project[0]?.title}
        </div>
        {tasks.map((task) => {
          if (project_id == task.project_id) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
            const date = new Date(task.due_date).toLocaleDateString("en-US", options)
            return (
              <div key={task.id} className='IndvTaskContainer'>
                <div>{task.task}</div>
                <div>{date}</div>
                <div>{task.completed}</div>
              </div>
            )
          }
        })}
        <NavLink to='/tasks' exact={true} className='AddATaskNav'>
          <div className='AddATaskOnTaskLists'>
            <div>
              <BsPlusLg />
            </div>
            <div className='AddATaskOnTaskListsText'>
              Add a task...
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default GetTasks;
