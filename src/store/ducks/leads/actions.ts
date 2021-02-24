import { action } from 'typesafe-actions';
import { LeadsTypes, Lead } from './types';
import INITIAL_STATE from './index';

export const updateRequest = () => action(LeadsTypes.UPDATE_REQUEST);

export const updateLead = (data: Lead) => action(LeadsTypes.UPDATE_SUCCESS, { data });

export const updateLeadField = (field: string, value: string | number | boolean) => action(LeadsTypes.UPDATE_FIELD, { field, value });

export const failureLead = () => action(LeadsTypes.UPDATE_FAILURE);

export const resetLead = () => action(LeadsTypes.RESET_STATE, { INITIAL_STATE });