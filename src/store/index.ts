import { devToolsEnhancer } from '@redux-devtools/extension';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import { todosReducer } from './todos/reducer';

const rootReducer = combineReducers({
  todos: todosReducer,
});

export const store = createStore(rootReducer, {}, devToolsEnhancer({ trace: true }));

export type RootState = ReturnType<(typeof store)['getState']>;
export type AppDispatch = (typeof store)['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
