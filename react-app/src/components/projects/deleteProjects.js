import { useDispatch } from 'react-redux';
import { deleteProject, getProjects } from '../../store/projects'

const DeleteProjects = ({id}) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteProject(id))
    dispatch(getProjects())
  };

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  )
}

export default DeleteProjects
