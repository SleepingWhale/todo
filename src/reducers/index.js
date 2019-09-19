import { combineReducers } from 'redux';
import { todoReducer } from './todos';

export const rootReducer = combineReducers({
  todos: todoReducer
});

export * from './todos';
