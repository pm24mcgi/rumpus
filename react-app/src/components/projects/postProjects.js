import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating'
import { postProject } from '../../store/projects'
import ColorSelect from '../customSelect/customSelect';

const PostProjects = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [color, setColor] = useState('none');
  const [favorite, setFavorite] = useState(false);
  const [favoriteTGL, setFavoriteTGL] = useState(0);
  const [validationErrors, setValidationErrors] = useState([]);
	const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleFavorite = () => {
    if (favoriteTGL === 0) {
      setFavoriteTGL(100)
      setFavorite(true)
    }
    if (favoriteTGL === 100) {
      setFavoriteTGL(0)
      setFavorite(false)
    }
  }

  useEffect(() => {
		const errors = [];
		if (title.length === 0) errors.push("Please provide a title for this project");
		setValidationErrors(errors);
	}, [
		title
	]);

  const handleChange = (selectedColor) => {
    setColor(selectedColor)
  }

  const onSubmit = async (e) => {
		e.preventDefault();

		setHasSubmitted(true);
		const data = {
      title,
      color,
      favorite
		};

		if (validationErrors.length <= 0) {
			await dispatch(postProject(data));
			setValidationErrors([]);
      setTitle('')
      setColor('none')
      setFavorite(false)
			setHasSubmitted(false);
      history.push('/')
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
                <p className='errorMsg' key={idx}>{error}</p>
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
            <br></br>
            <label>Flag Color</label>
            <ColorSelect onChange={handleChange} setColor={setColor} defaultValue={color} />
            <br></br>
            {/* <label>Favorite</label>
            <Rating onClick={handleFavorite} ratingValue={favoriteTGL} emptyColor={'rgb(211, 211, 211)'} fillColor={'rgb(255,255,0)'} size={20} initialValue={0} allowHover={false} iconsCount={1} /> */}
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
