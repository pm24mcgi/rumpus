import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { getProjects } from '../../store/projects';
import { postTask } from '../../store/tasks'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import '../../css/main.css'
import '../../css/errors.css'

const PostTask = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector(state => state.session.user.id)
  const allProjects = Object.values(useSelector(state => state.project))

  const projects = []

  allProjects.map((project) => {
    if (project.user_id == userId) {
      projects.push(project)
    }
  })

  const [task, setTask] = useState('');
  const [project_id, setProject] = useState();
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

  return (
    <div className='TaskAddContainer'>
      <div>
        Add A Task
      </div>
      <form onSubmit={handleSubmit}>
        {hasSubmitted && validationErrors.length > 0 && (
          <div>
            {validationErrors.map((error, idx) => (
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
          <option disabled selected>Select a project...</option>
          {projects.map((option) => (
            <option key={option.id} value={option.id}>{option.title}</option>
          ))}
        </select>
          <div>Due Date</div>
        </div>
        <div className='PostTaskCalendarContainer'>
          <Calendar minDate={new Date()} onChange={setDueDate} value={dueDate} calendarType={'US'} />
        </div>
        <button type="submit">Submit New Task</button>
        <button>
          <NavLink to='/' className='CancelNavLinkText'>
            Cancel
          </NavLink>
        </button>
      </form>
    </div>
  );
};

export default PostTask;
