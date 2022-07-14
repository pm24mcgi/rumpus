import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getTasks } from '../../store/tasks';
import { BsPlusLg } from 'react-icons/bs';


const AllTasks = () => {
  const dispatch = useDispatch();
  const tasks = Object.values(useSelector(state => state.task));
  const userId = useSelector(state => state.session.user.id);

  const allTasks = tasks.filter((e) => e.user_id === userId);

  const options2 = { weekday: 'short', month: 'short', day: 'numeric' };

  const today = new Date().toLocaleDateString("en-US", options2);

  console.log(allTasks, "pre-sort")


  useEffect(() => {
    dispatch(getTasks());
  }, []);

  allTasks.sort((objA, objB) => {
    if (new Date(objA.due_date).getTime() > new Date(objB.due_date).getTime()) {
      return 1
    } else {
      return -1
    }
  });

  console.log(allTasks, "post-sort")

  return(
    <div className='TaskContainer'>
      <div className='TaskContainerInternal'>
        <div className='AllTaskContainerDateContainer'>
          Today
          <div className='TodaysDateDisplayAllTasks'>
            {today}
          </div>
        </div>
        {allTasks.map((task) => {
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
          const date = new Date(task.due_date).toLocaleDateString("en-US", options)
          return (
            <div key={task.id} className='IndvTaskContainer'>
              <div>{task.task}</div>
              <div>{date}</div>
              <div>{task.completed}</div>
            </div>
          )
          })}
        <NavLink to='/tasks' exact={true} activeClassName='active'>
          <BsPlusLg /> Add a task...
        </NavLink>
      </div>
    </div>
  );
};

export default AllTasks;
