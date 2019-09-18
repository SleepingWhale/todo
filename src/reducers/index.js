import { combineReducers } from 'redux';
import { todoReducer } from './todos';

export const rootReducer = combineReducers({
  todos: todoReducer
});
