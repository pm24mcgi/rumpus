import { useDispatch } from 'react-redux';
import { deleteTask, getTasks } from '../../store/tasks'
import '../../css/forms.css'

const DeleteTask = ({id, setEditOpen}) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteTask(id))
    setEditOpen(false)
  };

  return (
    <button onClick={handleDelete}  className="FormInputFieldTextEditAndPostButton">
      Delete Task
    </button>
  )
}

export default DeleteTask
