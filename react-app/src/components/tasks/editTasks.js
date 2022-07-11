import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProjects } from '../../store/projects';
import { editTask } from '../../store/tasks'

const EditTask = () => {
  const dispatch = useDispatch();
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
  const [dueDate, setDueDate] = useState();
  // const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    dispatch(getProjects());
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      task,
      project_id,
      priority,
      dueDate
    };

    await dispatch(editTask(payload))
  };

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
          <select
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
            </select>
            <div>Due Date Cal Comp</div>
        </div>
        <button type="submit">Submit Task Edit</button>
      </form>
    </div>
  );
};

export default PostTask;
