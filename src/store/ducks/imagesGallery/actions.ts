import { action } from 'typesafe-actions';
import { ImagesTypes, Image } from './types'

export const updateRequest = () => action(ImagesTypes.UPDATE_REQUEST);

export const updateImage = (data: Image) => action(ImagesTypes.UPDATE_SUCCESS, { data });

export const updateImageField = (field: string, value: any) => action(ImagesTypes.UPDATE_FIELD, { field, value });

export const failureImage = () => action(ImagesTypes.UPDATE_FAILURE);