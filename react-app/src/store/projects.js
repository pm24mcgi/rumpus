const LOAD = '/projects/LOAD';
const CREATE = '/projects/CREATE';
const REMOVE = '/projects/REMOVE';
const EDIT = '/projects/EDIT';

// ACTION CREATORS
const load = list => ({
  type: LOAD,
  list
});

const create = project => ({
  type: CREATE,
  project
});

const edit = project => ({
  type: EDIT,
  project
});

const remove = project => ({
  type: REMOVE,
  project
})

// "THUNK" ACTIONS CREATORS
export const getProjects = () => async dispatch => {
  const response = await fetch(`/api/projects`);

  if (response.ok) {
    const projectList = await response.json();
    dispatch(load(projectList));
    return projectList;
  };
};

export const postProject = (payload) => async dispatch => {
  const response = await fetch(`/api/projects/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const project = await response.json();
    dispatch(create(project));
    return project;
  };
}

export const editproject = (payload, review_id) => async dispatch => {
  const response = await fetch(`/api/reviews/${review_id}`, {
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

export const deleteProject = (review_id) => async dispatch => {
  const response = await fetch(`/api/reviews/${review_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review_id)
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(remove(review));
  };
};

// REDUCER
const projectReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const allProjects = action.list;
      return allProjects;
    case CREATE:
      return { ...state, [action.project.id]: action.project };
    case EDIT:
      return { ...state, [action.project.id]: action.project };
    case REMOVE:
      const deleteState = { ...state };
      delete deleteState[action.project.id];
      return deleteState;
    default:
      return state;
  }
}

export default projectReducer;
