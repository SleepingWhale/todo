import { connect } from 'react-redux';
import { TodoItem } from './TodoItem';
import { removeTodo, toggleTodo, updateTodo, getTodoById } from './reducers';

const mapStateToProps = (state, ownProps) => getTodoById(state, ownProps.id);

const mapDispatchToProps = dispatch => ({
  remove(id) {
    dispatch(removeTodo(id));
  },
  toggle(id) {
    dispatch(toggleTodo(id));
  },
  updateText(id, text) {
    dispatch(updateTodo(id, text));
  }
});

export const TodoItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem);
