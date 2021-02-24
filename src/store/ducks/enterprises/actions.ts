import { action } from 'typesafe-actions';
import { EnterprisesTypes, Enterprise } from './types'

export const updateRequest = () => action(EnterprisesTypes.UPDATE_REQUEST);

export const updateEnterprise = (data: Enterprise[]) => action(EnterprisesTypes.UPDATE_SUCCESS, { data });

export const failureEnterprise = () => action(EnterprisesTypes.UPDATE_FAILURE);