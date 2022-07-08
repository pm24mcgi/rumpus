import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from 'react-simple-star-rating'
import { editproject } from '../../store/projects'

const EditProjects = ({id}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

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

  const onSubmit = async (e) => {
		e.preventDefault();

		setHasSubmitted(true);
		const data = {
      title,
      color,
      favorite
		};

		if (validationErrors.length <= 0) {
			await dispatch(editproject(data, id));
			setValidationErrors([]);
			setHasSubmitted(false);
		}
	};

  return (
    <div className='ProjectContainer'>
      <div>
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
            <label>Flag Color</label>
            <select
            className="inputForm"
            required
            name="color"
            onChange={(e) => setColor(e.target.value)}
            value={color}
            >
              <option value="none">None</option>
              <option value="blue">Blue</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="pink">pink</option>
              <option value="purple">Purple</option>
              <option value="yellow">Yellow</option>
            </select>
            <label>Favorite</label>
            <Rating onClick={handleFavorite} ratingValue={favoriteTGL} emptyColor={'rgb(211, 211, 211)'} fillColor={'rgb(255,255,0)'} size={20} initialValue={0} allowHover={false} iconsCount={1} />
          </div>
          <button className="Submit Btn" type="submit">
          Edit Project
        </button>
        </form>
      </div>
    </div>
  )
}

export default EditProjects;
