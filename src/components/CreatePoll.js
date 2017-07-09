import React, { Component } from 'react';

import { createPoll } from '../firebase/polls';

class CreatePoll extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      options: [''],
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
    this.addOption = this.addOption.bind(this);
    this.createPoll = this.createPoll.bind(this);
  }

  onTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  onOptionChange(index) {
    return (event) => {
      const options = this.state.options;

      this.setState({
        options: [
          ...options.slice(0, index),
          event.target.value,
          ...options.slice(index + 1),
        ],
      });
    };
  }

  addOption() {
    this.setState({
      options: this.state.options.slice().concat(['']),
    });
  }

  createPoll() {
    createPoll(1, this.state.title, this.state.options);
    this.setState({
      title: '',
      options: [''],
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={this.onTitleChange}
        />
        <ul>
          {this.state.options.map((option, i) =>
            (<li key={i}>
              <input
                type="text"
                placeholder="Option"
                value={option}
                onChange={this.onOptionChange(i)}
              />
            </li>),
          )}
        </ul>
        <button className="btn btn-secondary" onClick={this.addOption}>Add option</button>
        <button className="btn btn-primary" onClick={this.createPoll}>Create poll</button>
      </div>
    );
  }
}

export default CreatePoll;
