import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { postProject } from '../../store/projects'
import ColorSelect from '../customSelect/customSelect';
import '../../css/errors.css'

const PostProjects = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#a9a8a8');
  const [validationErrors, setValidationErrors] = useState([]);
	const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
		const errors = [];
		if (title.length === 0) errors.push("Please provide a title for this project");
    if (title.length > 100) errors.push("Project titles must be less than 100 characters");
		setValidationErrors(errors);
	}, [title]);

  const handleChange = (selectedColor) => {
    setColor(selectedColor)
  }

  const onSubmit = async (e) => {
		e.preventDefault();

		setHasSubmitted(true);
		const data = {
      title,
      color,
      favorite: false
		};

		if (validationErrors.length <= 0) {
			const project = await dispatch(postProject(data));
			setValidationErrors([]);
			setHasSubmitted(false);
      history.push(`/projects/${project.id}`)
		}
	};

  return (
    <div className='ProjectContainer'>
      <div>
        <h4>Add a Project:</h4>
        <form onSubmit={onSubmit}>
          {hasSubmitted && validationErrors.length > 0 && (
            <div>
              {validationErrors.map((error, idx) => (
                <div className='ErrorDiv' key={idx}>{error}</div>
              ))}
            </div>
          )}
          <div>
            <label>Project Title</label>
            <input
            className="inputForm"
            name="title"
            type="text"
            placeholder="Project Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            />
            <br></br>
            <label>Flag Color</label>
            <ColorSelect onChange={handleChange} setColor={setColor} defaultValue={color} />
            <br></br>
          </div>
          <button className="Submit Btn" type="submit">
          + Add Project
          </button>
          <button>
            <NavLink to='/' className='CancelNavLinkText'>
              Cancel
            </NavLink>
          </button>
        </form>
      </div>
    </div>
  )
}

export default PostProjects;
