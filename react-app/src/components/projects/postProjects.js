import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { postProject } from '../../store/projects'
import ColorSelect from '../customSelect/customSelect';
import '../../css/errors.css'
import '../../css/forms.css'

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
    if (title.length > 100) errors.push("Project titles must be 100 characters or less");
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
    <div className='FormsProjectContainer'>
      <div className='FormsProjectContainer'>
        <h4>Add a Project:</h4>
        <form onSubmit={onSubmit} className='EditAndPostForm'>
          {hasSubmitted && validationErrors.length > 0 && (
            <div>
              {validationErrors.map((error, idx) => (
                <div className='ErrorDiv' key={idx}>{error}</div>
              ))}
            </div>
          )}
          <div className='FormInputFieldEditAndPost'>
            <label className='FormInputFieldTextEditAndPost'>Project Title</label>
            <input
            className='FormInputFieldActual'
            name="title"
            type="text"
            placeholder="Enter project title..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            />
            <br></br>
            <label className='FormInputFieldTextEditAndPost'>Color Select</label>
            <ColorSelect className='FormInputFieldActual' onChange={handleChange} setColor={setColor} defaultValue={color} />
            <br></br>
          </div>
          <button className="FormInputFieldTextEditAndPostButton" type="submit">
          + Add Project
          </button>
          <NavLink to='/' className="FormInputFieldTextEditAndPostNavLink">
            <button className="FormInputFieldTextEditAndPostButton">
                Cancel
            </button>
          </NavLink>
        </form>
      </div>
    </div>
  )
}

export default PostProjects;
