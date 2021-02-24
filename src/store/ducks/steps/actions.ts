import { action } from 'typesafe-actions';
import { StepsTypes } from './types'

export const updateRequest = () => action(StepsTypes.UPDATE_REQUEST);

export const updateStep = (page: string) => action(StepsTypes.UPDATE_SUCCESS, { page });

export const failureStep = () => action(StepsTypes.UPDATE_FAILURE);