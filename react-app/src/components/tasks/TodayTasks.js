import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { getTasks } from '../../store/tasks';
import { BsPlusLg } from 'react-icons/bs';
import { CgToday } from 'react-icons/cg'
import EditTask from './editTasks';
import '../../css/task.css'


const TodayTasks = () => {
  const dispatch = useDispatch();
  const tasks = Object.values(useSelector(state => state.task));
  const userId = useSelector(state => state.session.user.id);

  const allTasks = tasks.filter((e) => e.user_id === userId);

  const options2 = { weekday: 'short', month: 'short', day: 'numeric' };

  const today = new Date().toLocaleDateString("en-US", options2);

  const [editOpen, setEditOpen] = useState(false)
  const [idTask, setIdTask] = useState('initial state')


  useEffect(() => {
    dispatch(getTasks());
  }, []);

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

  const onClick = (e) => {
    setIdTask(e.target.id)
    setEditOpen(!editOpen)
  }

  return(
    <div className='TaskContainer'>
      <div className='TodaysDateDisplayAllTasks'>
        {today}
      </div>
      <div className='TaskContainerInternal'>
        <div className='TaskContainerProjectDescription'>
          <div className='TaskContainerProjectDescriptionIcon'>
            <CgToday />
          </div>
          <div>
            Today
          </div>
        </div>
        {todayTasks.map((task) => {
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
          const date = new Date(task.due_date)
          const newDate = new Date(date.setDate(date.getDate() + 1))
          const formatDate = newDate.toLocaleDateString("en-US", options)
          return (
            <div className='IndvTaskContainerOutter'>
              <div key={task.id} className='IndvTaskContainer'>
                <div className='IndvTaskInfoContainer'>
                  <div className='IndvTask'>{task.task}</div>
                  <div className='IndvTaskDate'>Due: {formatDate}</div>
                  {/* <div>{task.completed}</div> */}
                </div>
                <div onClick={onClick} id={task.id} className='EditTaskContainer'>
                  edit
                </div>
              </div>
              {Number(idTask) == task.id &&
              editOpen &&
              <EditTask idTask={idTask} setEditOpen={setEditOpen}/>}
            </div>
          )
          })}
        <NavLink to='/tasks' exact={true} className='AddATaskNav'>
          <div className='AddATaskOnTaskLists'>
            <div>
              <BsPlusLg size={12}/>
            </div>
            <div className='AddATaskOnTaskListsText'>
              Add task
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default TodayTasks;
