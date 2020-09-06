import React, { Component } from 'react';
import './index.css';

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.sendText = this.sendText.bind(this);
    this.close = this.close.bind(this);

    this.state = {
      textFromInput: ''
      // textFromInput: props.txt
    }
    this.sendToParrent = props.func
  }

  componentWillReceiveProps(nProps) {
    if(!nProps.recive){return}
    this.setState({
      textFromInput: nProps.txt,
    })
  }

  handleChange(event) {
    this.setState({
      textFromInput: event.target.value,
    });
  }

  handleEnter(event) {
    if (event.key === 'Enter') {
      this.sendText()
    }
  }

  render() {
    return (
      <div className="inp hidden">
        <div className="close" onClick={this.close}>X</div>
        <textarea placeholder="enter new task"
          value={this.state.textFromInput}
          onChange={this.handleChange}
          onKeyPress={this.handleEnter}></textarea>
        <div className="enter" onClick={this.sendText}>
          <div className="txt">ENTER</div>
        </div>
      </div>
    )
  }

  sendText() {
    this.sendToParrent(this.state.textFromInput)
    this.close()
  }

  close() {
    document.querySelector(".inp").classList.add("hidden");
    this.setState({
      textFromInput: ''
    });
  }
}
