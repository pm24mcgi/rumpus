import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { editProject } from '../../store/projects'
import ColorSelect from '../customSelect/customSelect';
import DeleteProjects from './deleteProjects';
import '../../css/errors.css'

const EditProjects = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const projectIdObj = useParams();
  const id = projectIdObj.project_id

  const project = useSelector(state => state.project[id])

  const [title, setTitle] = useState(project?.title);
  const [color, setColor] = useState(project?.color);
  const [validationErrors, setValidationErrors] = useState([]);
	const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (project) {
      setTitle(project.title)
      setColor(project.color)
    }
  }, [project])

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
			await dispatch(editProject(data, id));
			setValidationErrors([]);
			setHasSubmitted(false);
      history.push(`/projects/${id}`)
		}
	};

  return (
    <div className='ProjectContainer'>
      <div>
        <form>
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
            required
            name="title"
            type="text"
            placeholder="Project Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            />
            <label>Flag Color</label>
            <ColorSelect onChange={handleChange} setColor={setColor} defaultValue={color} />
          </div>
          <button className="Submit Btn" onClick={onSubmit}>
          Edit Project
          </button>
          <DeleteProjects id={id}/>
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

export default EditProjects;
