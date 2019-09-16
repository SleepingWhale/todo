import React from 'react';
import 'todomvc-app-css/index.css';

export function App() {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo" placeholder="What needs to be done?" />
      </header>
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          <li className="completed">
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>td1</label>
              <button type="button" className="destroy" />
            </div>
            <input className="edit" defaultValue="td1" />
          </li>
          <li className="">
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>td2</label>
              <button type="button" className="destroy" />
            </div>
            <input className="edit" defaultValue="td2" />
          </li>
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <span>1 item left</span>
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
        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </section>
  );
}
