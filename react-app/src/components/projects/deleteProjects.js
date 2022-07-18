import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteProject, getProjects } from '../../store/projects'
import '../../css/forms.css'

const DeleteProjects = ({id}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteProject(id))
    dispatch(getProjects())
    history.push('/')
  };

  return (
    <button onClick={handleDelete}  className="FormInputFieldTextEditAndPostButton">
      Delete
    </button>
  )
}

export default DeleteProjects
