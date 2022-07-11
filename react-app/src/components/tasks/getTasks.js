import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTasks } from '../../store/tasks'


const GetTasks = () => {
  const dispatch = useDispatch();
  const tasks = Object.values(useSelector(state => state.task))
  const { project_id } = useParams();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch])

  return(
    <div>
      {tasks.map((task) => {
        if (project_id == task.project_id) {
          return (
            <div key={task.id}>
              <div>{task.task}</div>
              <div>{task.due_date}</div>
              <div>{task.completed}</div>
            </div>
          )
        }
      })}
    </div>
  );
};

export default GetTasks;
