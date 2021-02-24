import { action } from 'typesafe-actions';
import { ParametersTypes, Parameter } from './types'

export const updateRequest = () => action(ParametersTypes.UPDATE_REQUEST);

export const updateParameters = (data: Parameter[]) => action(ParametersTypes.UPDATE_SUCCESS, { data });

export const failureParameters = () => action(ParametersTypes.UPDATE_FAILURE);