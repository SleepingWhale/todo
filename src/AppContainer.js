import { connect } from 'react-redux';
import { App } from './App';
import {
  getTodoList,
  removeCompletedTodo,
  addTodo,
  getUncompletedCount,
  toggleAll
} from './reducers';

const mapStateToProps = state => ({
  todoList: getTodoList(state),
  uncompletedCount: getUncompletedCount(state)
});

const mapDispatchToProps = dispatch => ({
  removeCompletedTodo() {
    dispatch(removeCompletedTodo());
  },
  addTodo(text) {
    dispatch(addTodo(text));
  },
  toggleAll(value) {
    dispatch(toggleAll(value));
  }
});

export const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
