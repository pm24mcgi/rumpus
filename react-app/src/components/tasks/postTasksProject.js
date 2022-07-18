import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink, useParams } from 'react-router-dom';
import { getProjects } from '../../store/projects';
import { postTask } from '../../store/tasks'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import '../../css/main.css'
import '../../css/errors.css'
import '../../css/forms.css'

const PostTaskProject = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(state => state.session.user.id)
  const allProjects = Object.values(useSelector(state => state.project))
  const projId = useParams()
  const projIdNum = projId.project_id

  const projects = []

  allProjects.map((project) => {
    if (project.user_id == userId) {
      projects.push(project)
    }
  })

  const [task, setTask] = useState('');
  const [project_id, setProject] = useState(projIdNum);
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

    const id = parseInt(project_id)

    if (validationErrors.length <= 0) {
      await dispatch(postTask(payload))
      .then(history.push(`/projects/${id}`))
    }
  };

  const project = allProjects.filter((e) => e.id == project_id)

  if(!project.length) {
    history.push('/404')
  }

  return (
      <div className='FormsProjectContainer'>
        <div className='FormsProjectContainer'>
          <h4>Add A Task</h4>
        </div>
        <form onSubmit={handleSubmit} className='EditAndPostForm'>
          {hasSubmitted && validationErrors.length > 0 && (
            <div>
              {validationErrors.map((error, idx) => (
                <div className='ErrorDiv' key={idx}>{error}</div>
              ))}
            </div>
          )}
          <div className='FormInputFieldEditAndPost'>
          <label className='FormInputFieldTextEditOnly'>Task Description</label>
          <br></br>
            <input
            className='FormInputFieldActual'
            name="task"
            type="text"
            placeholder='Set a new task...'
            onChange={(e) => setTask(e.target.value)}
            value={task}
            />
          <label className='FormInputFieldTextEditOnly'>Project</label>
          <br></br>
          <select
            className='FormInputFieldEditAndPost'
            name="project"
            onChange={(e) => setProject(e.target.value)}
            value={project_id}
            >
            <option disabled selected>Select a project...</option>
            {projects.map((option) => (
            <option key={option.id} value={option.id}>{option.title}</option>
            ))}
          </select>
          <div className='FormInputFieldTextEditOnly'>Due Date</div>
          </div>
          <div className='PostTaskCalendarContainer'>
            <Calendar minDate={new Date()} onChange={setDueDate} value={dueDate} calendarType={'US'} />
          </div>
          <button type="submit" className="FormInputFieldTextEditAndPostButton">Submit New Task</button>
          <NavLink to='/' className="FormInputFieldTextEditAndPostNavLink">
            <button className="FormInputFieldTextEditAndPostButton">
              Cancel
            </button>
          </NavLink>
        </form>
      </div>
    );
};

export default PostTaskProject;
