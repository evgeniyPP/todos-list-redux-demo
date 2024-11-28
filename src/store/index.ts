import { combineReducers, legacy_createStore as createStore } from 'redux';
import { todosReducer } from './todos/reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { devToolsEnhancer } from '@redux-devtools/extension';

const rootReducer = combineReducers({
  todos: todosReducer,
});

export const store = createStore(rootReducer, {}, devToolsEnhancer());

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
