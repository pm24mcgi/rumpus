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

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const options2 = { weekday: 'short', month: 'short', day: 'numeric' };

  const today = new Date().toLocaleDateString("en-US", options2);

  const dateCheck = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
  dateCheck.setHours(0, 0, 0, 0);

  let overdue = []
  let dueToday = []
  let upcomming = []

  useEffect(() => {
    dispatch(getTasks());

    allTasks.map((task) => {
      const date = new Date(task.due_date)
      if ((new Date(date)) < (new Date(dateCheck))) {
        overdue.push(task)
      } else if ((new Date(date)) - (dateCheck) < (24 * 60 * 60 * 1000)) {
        dueToday.push(task)
      } else if ((new Date(date)) > (new Date(dateCheck))) {
        upcomming.push(task)
      }
    })

    // console.log(overdue)

    overdue.sort((objA, objB) => {
      if (new Date(objA.due_date).getTime() > new Date(objB.due_date).getTime()) {
        return 1
      } else {
        return -1
      }
    });

    dueToday.sort((objA, objB) => {
      if (new Date(objA.due_date).getTime() > new Date(objB.due_date).getTime()) {
        return 1
      } else {
        return -1
      }
    });

    upcomming.sort((objA, objB) => {
      if (new Date(objA.due_date).getTime() > new Date(objB.due_date).getTime()) {
        return 1
      } else {
        return -1
      }
    });
  }, []);

  return(
    <div className='TaskContainer'>
      <div className='TaskContainerInternal'>
        <div className='AllTaskContainerDateContainer'>
          Today
          <div className='TodaysDateDisplayAllTasks'>
            {today}
          </div>
        </div>
        {/* {overdue.length > 0 &&
        <div>Overdue</div> ?
          overdue.map((task) => {}
            return(
              <div>{task.title</div>
            )
          })
        : null} */}
        <NavLink to='/tasks' exact={true} activeClassName='active'>
          <BsPlusLg /> Add a task...
        </NavLink>
      </div>
    </div>
  );
};

export default AllTasks;
