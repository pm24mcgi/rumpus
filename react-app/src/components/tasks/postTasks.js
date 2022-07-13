import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { getProjects } from '../../store/projects';
import { postTask } from '../../store/tasks'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import '../../css/main.css'

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
  const [priority, setPriority] = useState(4);
  const [dueDate, setDueDate] = useState(new Date());
  // const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    dispatch(getProjects());
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dbDateConversion = dueDate.getFullYear() + "-" + (dueDate.getMonth() + 1) + "-" + dueDate.getDate()

    const payload = {
      task,
      project_id,
      priority,
      due_date: dbDateConversion
    };

    const id = parseInt(project_id)

    await dispatch(postTask(payload))
    .then(history.push(`/projects/${id}`))
  };

  return (
    <div className='TaskAddContainer'>
      <div>
        Add A Task
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
          <option disabled selected>Select a project...</option>
          {projects.map((option) => (
            <option key={option.id} value={option.id}>{option.title}</option>
          ))}
        </select>
        <select
          className="inputForm"
          required
          name="priority"
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
          >
            <option disabled selected>Priority...</option>
            <option value="1">Priority 1</option>
            <option value="2">Priority 2</option>
            <option value="3">Priority 3</option>
            <option value="4">Priority 4</option>
          </select>
          <div>Due Date</div>
        </div>
        <div className='PostTaskCalendarContainer'>
          <Calendar onChange={setDueDate} value={dueDate} calendarType={'US'} />
        </div>
        <button type="submit">Submit New Task</button>
        <NavLink to='/'>
          Cancel
        </NavLink>
      </form>
    </div>
  );
};

export default PostTask;
