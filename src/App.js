import React, { Component } from 'react';
import 'todomvc-app-css/index.css';
import { TodoItem } from './TodoItem';
import { getGuid, pluralize, ENTER_KEY } from './utils';

export class App extends Component {
  state = {
    newTodo: '',
    todos: [
      {
        completed: true,
        text: 'pull',
        id: getGuid()
      },
      {
        completed: false,
        text: 'commit',
        id: getGuid()
      },
      {
        completed: false,
        text: 'push',
        id: getGuid()
      },
      {
        completed: false,
        text: 'repeat',
        id: getGuid()
      }
    ]
  };

  handleChange = event => {
    this.setState({ newTodo: event.target.value });
  };

  handleNewTodoKeyDown = event => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const { newTodo, todos } = this.state;
    const text = newTodo.trim();

    if (text) {
      this.setState({
        todos: [...todos, { text, completed: false, id: getGuid() }],
        newTodo: ''
      });
    }
  };

  handleToggleAll = event => {
    const { checked } = event.target;
    const { todos } = this.state;

    this.setState({
      todos: todos.map(todo => {
        return {
          ...todo,
          completed: checked
        };
      })
    });
  };

  handleToggleTodo = id => {
    const { todos } = this.state;
    const todoIndex = todos.findIndex(todo => todo.id === id);

    this.setState({
      todos: [
        ...todos.slice(0, todoIndex),
        {
          ...todos[todoIndex],
          completed: !todos[todoIndex].completed
        },
        ...todos.slice(todoIndex + 1)
      ]
    });
  };

  handleRemoveTodo = id => {
    const { todos } = this.state;

    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  };

  handleUpdateText = (id, text) => {
    const { todos } = this.state;
    const todoIndex = todos.findIndex(todo => todo.id === id);

    this.setState({
      todos: [
        ...todos.slice(0, todoIndex),
        {
          ...todos[todoIndex],
          text
        },
        ...todos.slice(todoIndex + 1)
      ]
    });
  };

  handleClearCompleted = () => {
    const { todos } = this.state;

    this.setState({
      todos: todos.reduce((acc, todo) => {
        if (!todo.completed) acc.push(todo);

        return acc;
      }, [])
    });
  };

  getInCompletedCount = () => {
    const { todos } = this.state;

    return todos.filter(todo => !todo.completed).length;
  };

  render() {
    const { todos, newTodo } = this.state;
    const completedCount = this.getInCompletedCount();

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
            {todos.map(todo => (
              <TodoItem
                completed={todo.completed}
                text={todo.text}
                key={todo.id}
                id={todo.id}
                toggle={this.handleToggleTodo}
                remove={this.handleRemoveTodo}
                updateText={this.handleUpdateText}
              />
            ))}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <span>{`${completedCount} ${pluralize(
              'item',
              completedCount
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
            onClick={this.handleClearCompleted}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}
