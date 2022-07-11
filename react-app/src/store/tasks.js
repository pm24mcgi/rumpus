const LOAD = '/tasks/LOAD';
const CREATE = '/tasks/CREATE';
const EDIT = '/tasks/EDIT';
const REMOVE = '/tasks/REMOVE';

// ACTION CREATORS
const load = list => ({
  type: LOAD,
  list
});

const create = task => ({
  type: CREATE,
  task
});

const edit = task => ({
  type: EDIT,
  task
});

const remove = task => ({
  type: REMOVE,
  task
})

// "THUNK" ACTIONS CREATORS
export const getTasks = () => async dispatch => {
  const response = await fetch(`/api/tasks`);

  if (response.ok) {
    const taskList = await response.json();
    dispatch(load(taskList));
    return taskList;
  };
};

export const postTask = (payload, project_id) => async dispatch => {
  const response = await fetch(`/api/tasks/${project_id}/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const task = await response.json();
    dispatch(create(task));
    return task;
  };
}

export const editTask = (payload, task_id) => async dispatch => {
  const response = await fetch(`/api/tasks/${task_id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const review = await response.json()
  if (review) {
    dispatch(edit(review));
  };
  return review;
};

export const deleteTask = (task_id) => async dispatch => {
  const response = await fetch(`/api/tasks/${task_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task_id)
  });

  if (response.ok) {
    const task = await response.json();
    dispatch(remove(task));
  };
};


// REDUCER
const taskReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const allTasks = action.list;
      return allTasks;
    case CREATE:
      return { ...state, [action.task.id]: action.task };
    case EDIT:
      return { ...state, [action.task.id]: action.task };
    case REMOVE:
      const deleteState = { ...state };
      delete deleteState[action.task];
      return deleteState;
    default:
      return state;
  }
}

export default taskReducer;
