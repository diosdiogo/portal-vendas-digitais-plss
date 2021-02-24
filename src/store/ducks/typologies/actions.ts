import { action } from 'typesafe-actions';
import { TypologiesTypes, Typology } from './types'

export const updateRequest = () => action(TypologiesTypes.UPDATE_REQUEST);

export const updateTypologies = (data: Typology[]) => action(TypologiesTypes.UPDATE_SUCCESS, { data });

export const updateTypologyField = (field: string, value: string | number | boolean) => action(TypologiesTypes.UPDATE_FIELD, { field, value });

export const failureTypologies = () => action(TypologiesTypes.UPDATE_FAILURE);