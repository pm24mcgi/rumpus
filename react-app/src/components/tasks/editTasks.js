import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProjects } from '../../store/projects';
import { editTask } from '../../store/tasks'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import DeleteTask from './deleteTasks'

const EditTask = ({idTask, setEditOpen}) => {
  const id = Number(idTask)
  const dispatch = useDispatch();
  const userId = useSelector(state => state.session.user.id)
  const thisTask = useSelector(state => state.task[id])
  const allProjects = Object.values(useSelector(state => state.project))

  const projects = []

  allProjects.map((project) => {
    if (project.user_id == userId) {
      projects.push(project)
    }
  })

  const [task, setTask] = useState('');
  const [project_id, setProject] = useState('');
  // const [priority, setPriority] = useState(4);
  const [dueDate, setDueDate] = useState(new Date());
  // const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    dispatch(getProjects());
  }, [])

  useEffect(() => {
    if (thisTask) {
      const date = new Date(thisTask?.due_date)
      const newDate = new Date(date.setDate(date.getDate() + 1))
      setTask(thisTask?.task)
      setProject(thisTask?.project_id)
      setDueDate(new Date(newDate))
    }
  }, [thisTask, idTask])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dbDateConversion = dueDate.getFullYear() + "-" + (dueDate.getMonth() + 1) + "-" + dueDate.getDate()

    const payload = {
      task,
      project_id,
      priority:4,
      due_date: dbDateConversion
    };

    await dispatch(editTask(payload, thisTask?.id))
    setEditOpen(false)
  };

  const onClick = (e) => {
    setEditOpen(false)
  }

  return (
    <div>
      <div>
        Edit Task
      </div>
      <form onSubmit={handleSubmit}>
        <div>
        <label>Task</label>
            <input
            className="inputForm"
            required
            name="task"
            type="text"
            placeholder='Set a new task...'
            onChange={(e) => setTask(e.target.value)}
            value={task}
            />
         <select
            className="inputForm"
            required
            name="project"
            onChange={(e) => setProject(e.target.value)}
            value={project_id}
            >
            {projects.map((option) => (
              <option key={option.id} value={option.id}>{option.title}</option>
            ))}
          </select>
          {/* <select
            className="inputForm"
            required
            name="priority"
            onChange={(e) => setPriority(e.target.value)}
            value={priority}
            >
              <option value="1">Priority 1</option>
              <option value="2">Priority 2</option>
              <option value="3">Priority 3</option>
              <option value="4">Priority 4</option>
            </select> */}
            <div className='PostTaskCalendarContainer'>
              <Calendar onChange={setDueDate} value={dueDate} calendarType={'US'} />
            </div>
        </div>
        <button type="submit">Submit Task Edit</button>
        <DeleteTask id={thisTask?.id} setEditOpen={setEditOpen}/>
        <button onClick={onClick}>Cancel</button>
      </form>
    </div>
  );
};

export default EditTask;
