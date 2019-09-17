import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { ESCAPE_KEY, ENTER_KEY } from './utils';

export class TodoItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    updateText: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      newText: props.text
    };
  }

  handleToggleEditing = () => {
    this.setState({ editing: true });
  };

  handleOnChange = e => {
    const { value } = e.target;
    this.setState({ newText: value });
  };

  handleKeyDown = event => {
    if (event.keyCode === ESCAPE_KEY) {
      this.handleCancel();
    } else if (event.keyCode === ENTER_KEY) {
      this.handleSubmit();
    }
  };

  handleCancel = () => {
    const { text } = this.props;
    this.setState({ editing: false, newText: text });
  };

  handleSubmit = () => {
    const { newText } = this.state;
    const { id, updateText, remove } = this.props;
    const val = newText.trim();

    if (val.length > 0) {
      updateText(id, val);
      this.setState({ editing: false, newText: val });
    } else {
      remove(id);
    }
  };

  render() {
    const { id, text, completed, toggle, remove } = this.props;
    const { editing, newText } = this.state;

    return (
      <li
        className={cs({ completed, editing })}
        onDoubleClick={this.handleToggleEditing}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={() => toggle(id)}
          />
          <label>{text}</label>
          <button
            type="button"
            className="destroy"
            onClick={() => remove(id)}
          />
        </div>
        <input
          className="edit"
          value={newText}
          onChange={this.handleOnChange}
          onBlur={this.handleSubmit}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
}
