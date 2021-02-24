import { createStore, Store } from 'redux';
import { LeadsState } from './ducks/leads/types';
import { EnterprisesState } from './ducks/enterprises/types';
import { TypologiesState } from './ducks/typologies/types';
import { BlocksState } from './ducks/blocks/types';
import { ParametersState } from './ducks/parameters/types';
import { ImagesState } from './ducks/imagesGallery/types';
import { StepsState } from './ducks/steps/types';

import rootReducer from './ducks/rootReducer';

function saveToLocalStorage(state: any) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state',serializedState);
    } catch (e) {
        console.log(e);
    }
}

function loadFromLocaStorage() {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

const persistedState = loadFromLocaStorage();

export interface ApplicationState {
    leads: LeadsState,
    enterprises: EnterprisesState,
    typologies: TypologiesState,
    blocks: BlocksState,
    parameters: ParametersState,
    images: ImagesState,
    steps: StepsState,
}

const store: Store<ApplicationState> = createStore(rootReducer, persistedState);

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;