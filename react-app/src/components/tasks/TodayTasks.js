import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getTasks } from '../../store/tasks';
import { BsPlusLg } from 'react-icons/bs';


const TodayTasks = () => {
  const dispatch = useDispatch();
  const tasks = Object.values(useSelector(state => state.task));
  const userId = useSelector(state => state.session.user.id);

  const allTasks = tasks.filter((e) => e.user_id === userId);

  const options2 = { weekday: 'short', month: 'short', day: 'numeric' };

  const today = new Date().toLocaleDateString("en-US", options2);


  useEffect(() => {
    dispatch(getTasks());
  }, []);

  allTasks.forEach((e) => console.log(new Date(e.due_date).setHours(0, 0, 0, 0)))
  console.log(new Date().setHours(0, 0, 0, 0), "today")

  const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }

  const todayTasks = allTasks.filter((e) => {
    const date = new Date(e.due_date)
    const newDate = new Date(date.setDate(date.getDate() + 1))
    return isToday(new Date(newDate))
  })

  return(
    <div className='TaskContainer'>
      <div className='TodaysDateDisplayAllTasks'>
        {today}
      </div>
      <div className='TaskContainerInternal'>
        <div className='AllTaskContainerDateContainer'>
          Today
        </div>
        {todayTasks.map((task) => {
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
          const date = new Date(task.due_date)
          const newDate = new Date(date.setDate(date.getDate() + 1))
          const formatDate = newDate.toLocaleDateString("en-US", options)
          return (
            <div key={task.id} className='IndvTaskContainer'>
              <div>{task.task}</div>
              <div>{formatDate}</div>
              <div>{task.completed}</div>
            </div>
          )
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

export default TodayTasks;
