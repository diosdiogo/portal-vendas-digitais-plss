import { action } from 'typesafe-actions';
import { BlocksTypes, Block } from './types'

export const updateRequest = () => action(BlocksTypes.UPDATE_REQUEST);

export const updateBlocks = (data: Block[]) => action(BlocksTypes.UPDATE_SUCCESS, { data });

export const failureBlocks = () => action(BlocksTypes.UPDATE_FAILURE);