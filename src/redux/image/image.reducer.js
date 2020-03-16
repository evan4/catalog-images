import { ADD_IMAGE, REMOVE_IMAGES, TOGGLE_GROUP, ADD_TAG } from './image.types';

const INITIAL_STATE = {
  images: [],
  group: false,
  tag: ''
};

const imagerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      return {
        ...state,
        images: [...state.images, action.payload]
      }
    case REMOVE_IMAGES:
      return {
        ...state,
        images: [],
        group: false,
        tag: ''
      }
    case TOGGLE_GROUP:
      return {
        ...state,
        group: !state.group
      }
    case ADD_TAG:
      return {
        ...state,
        tag: action.payload
      }
    default:
      return state;
  }
}

export default imagerReducer;
