import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTasks } from '../../store/tasks'


const GetTasks = () => {
  const dispatch = useDispatch();
  const tasks = Object.values(useSelector(state => state.task))
  const projects = Object.values(useSelector(state => state.project))
  const { project_id } = useParams();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch])

  const project = projects.filter((e) => e.id == project_id)
  console.log(project)

  return(
    <div className='TaskContainer'>
      <div className='TaskContainerInternal'>
        <div className='TaskContainerProjectDescription'>
          {project[0].title}
        </div>
        {tasks.map((task) => {
          if (project_id == task.project_id) {
            console.log("Match")
            return (
              <div key={task.id} className='IndvTaskContainer'>
                <div>{task.task}</div>
                <div>{task.due_date}</div>
                <div>{task.completed}</div>
              </div>
            )
          }
        })}
      </div>
    </div>
  );
};

export default GetTasks;
