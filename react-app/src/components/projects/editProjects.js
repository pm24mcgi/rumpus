import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Rating } from 'react-simple-star-rating'
import { editProject } from '../../store/projects'

const EditProjects = ({id, project}) => {
  const dispatch = useDispatch();

  let favoriteStarter = 0
  if (project.favorite === true) {
    favoriteStarter = 100
  }

  const [title, setTitle] = useState(project.title);
  const [color, setColor] = useState(project.color);
  const [favorite, setFavorite] = useState(project.favorite);
  const [favoriteTGL, setFavoriteTGL] = useState(favoriteStarter);
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
			await dispatch(editProject(data, id));
			setValidationErrors([]);
			setHasSubmitted(false);
		}
	};

  return (
    <div className='ProjectContainer'>
      <div>
        <form>
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
              <option value='orange'>Orange</option>
            </select>
            <label>Favorite</label>
            <Rating onClick={handleFavorite} ratingValue={favoriteTGL} emptyColor={'rgb(211, 211, 211)'} fillColor={'rgb(255,255,0)'} size={20} initialValue={0} allowHover={false} iconsCount={1} />
          </div>
          <button className="Submit Btn" onClick={onSubmit}>
          Edit Project
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProjects;
