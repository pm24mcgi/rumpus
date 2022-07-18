import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { getTasks } from '../../store/tasks'
import { BsPlusLg } from 'react-icons/bs'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import EditTask from './editTasks';
import '../../css/task.css'


const GetTasks = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tasks = Object.values(useSelector(state => state.task))
  const projects = Object.values(useSelector(state => state.project))
  const { project_id } = useParams();
  console.log(project_id)

  const AddTaskRoute = `/tasks/${project_id}`

  const [editOpen, setEditOpen] = useState(false)
  const [idTask, setIdTask] = useState('initial state')

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch])

  const project = projects.filter((e) => e.id == project_id)
  console.log(project)

  tasks.sort((objA, objB) => {
    if (new Date(objA.due_date).getTime() > new Date(objB.due_date).getTime()) {
      return 1
    } else {
      return -1
    }
  });

  const onClick = (e) => {
    setIdTask(e.target.id)
    setEditOpen(!editOpen)
  }

  const options2 = { weekday: 'short', month: 'short', day: 'numeric' };

  const today = new Date().toLocaleDateString("en-US", options2);

  if(!project.length) {
    history.push('/404')
  }

  return(
    <div className='TaskContainer'>
      <div className='TodaysDateDisplayAllTasks'>
        {today}
      </div>
      <div className='TaskContainerInternal'>
        <div className='TaskContainerProjectDescription'>
          <div className='TaskContainerProjectDescriptionColor' style={{backgroundColor: `${project[0]?.color}`}}>
          </div>
          <div>
          {project[0]?.title}
          </div>
        </div>
        {tasks.map((task) => {
          if (project_id == task.project_id) {
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
          }
        })}
        <NavLink to={AddTaskRoute} exact={true} className='AddATaskNav'>
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

export default GetTasks;
