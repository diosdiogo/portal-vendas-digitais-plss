import { combineReducers } from 'redux';

import leads from './leads';
import enterprises from './enterprises';
import typologies from './typologies';
import blocks from './blocks';
import parameters from './parameters';
import images from './imagesGallery';
import steps from './steps'

export default combineReducers({
    leads,
    enterprises,
    typologies,
    blocks,
    parameters,
    images,
    steps,
})