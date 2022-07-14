import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating'
import { editProject } from '../../store/projects'
import ColorSelect from '../customSelect/customSelect';
import DeleteProjects from './deleteProjects';

const EditProjects = () => {
  const dispatch = useDispatch();
  const projectIdObj = useParams();
  const id = projectIdObj.project_id

  const projects = Object.values(useSelector(state => state.project))

  const project = projects.filter((e) => e.id == id)
  console.log(project)


  let favoriteStarter = 0
  if (project.favorite === true) {
    favoriteStarter = 100
  }

  const [title, setTitle] = useState(project?.title);
  const [color, setColor] = useState(project?.color);
  const [favorite, setFavorite] = useState(project?.favorite);
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
		if (title?.length === 0) errors.push("Please provide a title for this project");
		setValidationErrors(errors);
	}, [title]);


  useEffect(() => {
		setTitle(project?.title);
    setColor(project?.color);
    setFavorite(project?.favorite);
	}, [project.length]);

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
            <ColorSelect onChange={handleChange} setColor={setColor} defaultValue={color} />
            <label>Favorite</label>
            <Rating onClick={handleFavorite} ratingValue={favoriteTGL} emptyColor={'rgb(211, 211, 211)'} fillColor={'rgb(255,255,0)'} size={20} initialValue={0} allowHover={false} iconsCount={1} />
          </div>
          <button className="Submit Btn" onClick={onSubmit}>
          Edit Project
          </button>
          <DeleteProjects id={id}/>
        </form>
      </div>
    </div>
  )
}

export default EditProjects;
