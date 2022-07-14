import { useDispatch } from 'react-redux';
import { deleteTask, getTasks } from '../../store/tasks'

const DeleteTask = ({id}) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteTask(id))
  };

  return (
    <button onClick={handleDelete}>
      Delete Task
    </button>
  )
}

export default DeleteTask
