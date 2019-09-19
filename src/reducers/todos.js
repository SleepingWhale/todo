import _ from 'lodash';
import { setIn, getGuid } from '../utils';

// actions types
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const TOGGLE_ALL = 'TOGGLE_ALL';
export const UPDATE_TODO = 'UPDATE_TODO';
export const REMOVE_COMPLETED_TODOS = 'REMOVE_COMPLETED_TODOS';

// action creators
export const addTodo = text => ({
  type: ADD_TODO,
  todo: {
    id: getGuid(),
    text,
    completed: false
  }
});

export const removeTodo = id => ({
  type: REMOVE_TODO,
  id
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
});

export const toggleAll = value => ({
  type: TOGGLE_ALL,
  value
});

export const updateTodo = (id, text) => ({
  type: UPDATE_TODO,
  id,
  text
});

export const removeCompletedTodo = () => ({
  type: REMOVE_COMPLETED_TODOS
});

// Reducer
const initState = {
  todoList: [],
  todos: {}
};

export const todoReducer = (state = initState, action) => {
  const { todoList, todos } = state;

  switch (action.type) {
    case ADD_TODO: {
      return {
        todoList: setIn(todoList, todoList.length, action.todo.id),
        todos: setIn(todos, action.todo.id, action.todo)
      };
    }
    case REMOVE_TODO: {
      return {
        todoList: _.without(todoList, action.id),
        todos: _.omit(todos, action.id)
      };
    }
    case TOGGLE_TODO: {
      const currentValue = todos[action.id].completed;

      return setIn(state, ['todos', action.id, 'completed'], !currentValue);
    }
    case TOGGLE_ALL: {
      const updatedTodos = todoList.reduce((acc, id) => {
        const todo = todos[id];

        if (todo.completed !== action.value) {
          acc[id] = {
            ...todo,
            completed: action.value
          };
        } else {
          acc[id] = todo;
        }

        return acc;
      }, {});

      return setIn(state, 'todos', updatedTodos);
    }
    case UPDATE_TODO: {
      return setIn(state, ['todos', action.id, 'text'], action.text);
    }
    case REMOVE_COMPLETED_TODOS: {
      const todosToRemove = Object.values(todos).reduce((acc, todo) => {
        if (todo.completed) acc.push(todo.id);

        return acc;
      }, []);

      return {
        todoList: _.without(todoList, ...todosToRemove),
        todos: _.omit(todos, todosToRemove)
      };
    }
    default:
      return state;
  }
};

// selectors
export const getTodoList = state => state.todos.todoList;

export const getTodoById = (state, id) => state.todos.todos[id];

export const getUncompletedCount = state =>
  Object.values(state.todos.todos).filter(todo => !todo.completed).length;
