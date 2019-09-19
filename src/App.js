import React, { Component } from 'react';
import 'todomvc-app-css/index.css';
import { TodoItemContainer } from './TodoItemContainer';
import { pluralize, ENTER_KEY } from './utils';

export class App extends Component {
  state = {
    newTodo: ''
  };

  handleChange = event => {
    this.setState({ newTodo: event.target.value });
  };

  handleNewTodoKeyDown = event => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const { newTodo } = this.state;
    const { addTodo } = this.props;
    const text = newTodo.trim();

    if (text) {
      this.setState({
        newTodo: ''
      });
      addTodo(text);
    }
  };

  handleToggleAll = event => {
    const { checked } = event.target;
    const { toggleAll } = this.props;

    toggleAll(checked);
  };

  render() {
    const { newTodo } = this.state;
    const { uncompletedCount, removeCompletedTodo, todoList } = this.props;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={this.handleChange}
            onKeyDown={this.handleNewTodoKeyDown}
          />
        </header>
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={this.handleToggleAll}
          />
          <label htmlFor="toggle-all"></label>
          <ul className="todo-list">
            {todoList.map(id => (
              <TodoItemContainer id={id} key={id} />
            ))}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <span>{`${uncompletedCount} ${pluralize(
              'item',
              uncompletedCount
            )} left`}</span>
          </span>
          <ul className="filters">
            <li>
              <a href="/" className="selected">
                All
              </a>
            </li>
            <span> </span>
            <li>
              <a href="/" className="">
                Active
              </a>
            </li>
            <span> </span>
            <li>
              <a href="/" className="">
                Completed
              </a>
            </li>
          </ul>
          <button
            type="button"
            className="clear-completed"
            onClick={removeCompletedTodo}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}
