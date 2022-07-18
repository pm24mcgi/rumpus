import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../store/projects';
import { editTask } from '../../store/tasks'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import DeleteTask from './deleteTasks'
import '../../css/errors.css'

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
  const [dueDate, setDueDate] = useState(new Date());
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getProjects());
  }, [])

  useEffect(() => {
		const errors = [];
		if (task.length === 0) errors.push("Please provide a title for this task");
    if (task.length > 2000) errors.push("Task title must be 2000 characters or less");
    if (!project_id) errors.push("Please assign this task to project");
    if (!dueDate) errors.push("Please select a due date")
		setValidationErrors(errors);
	}, [task, project_id, dueDate]);

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
    setHasSubmitted(true);

    const dbDateConversion = dueDate.getFullYear() + "-" + (dueDate.getMonth() + 1) + "-" + dueDate.getDate()

    const payload = {
      task,
      project_id,
      priority:4,
      due_date: dbDateConversion
    };

    if (validationErrors.length <= 0) {
      await dispatch(editTask(payload, thisTask?.id))
      setEditOpen(false)
    }
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
        {validationErrors.length > 0 && (
          <div>
            {hasSubmitted && validationErrors.map((error, idx) => (
              <div className='ErrorDiv' key={idx}>{error}</div>
            ))}
          </div>
        )}
        <div>
        <label>Task</label>
            <input
            className="inputForm"
            name="task"
            type="text"
            placeholder='Set a new task...'
            onChange={(e) => setTask(e.target.value)}
            value={task}
            />
         <select
            className="inputForm"
            name="project"
            onChange={(e) => setProject(e.target.value)}
            value={project_id}
            >
            {projects.map((option) => (
              <option key={option.id} value={option.id}>{option.title}</option>
            ))}
          </select>
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
