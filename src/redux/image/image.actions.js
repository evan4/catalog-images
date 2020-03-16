import { ADD_IMAGE, REMOVE_IMAGES, TOGGLE_GROUP, ADD_TAG } from './image.types';

export const toggleGroup = () => ({
  type: TOGGLE_GROUP
});

export const addImage = image => ({
  type: ADD_IMAGE,
  payload: image
});

export const removeImages = () => ({
  type: REMOVE_IMAGES
});

export const addTag = tag => ({
  type: ADD_TAG,
  payload: tag
});
