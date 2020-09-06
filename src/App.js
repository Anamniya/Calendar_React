// import React from 'react';
import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import Page from './Page';
import Input from './Input';
import Tasks from './Tasks';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.reciveFromChid = this.reciveFromChid.bind(this);
    this.dateFromPage = this.dateFromPage.bind(this);
    this.taskFromTasks = this.taskFromTasks.bind(this);
    this.state = {
      textForTask: '',
      dateInApp: '',
      dateForTask: '',
      taskInApp: '',
      uid: '',
      originalIndex: -1
    }
    // Не вызывайте здесь this.setState()!
  }

  reciveFromChid(msg) {
    this.setState({
      textForTask: msg,
      dateForTask: this.state.dateInApp,
      uid: 'Tasks'
    });
  }

  dateFromPage(msg) {
    this.state.dateInApp = msg
    this.state.originalIndex = -1
  }

  taskFromTasks(msg) {
    this.setState({
      taskInApp: msg,
      uid: 'Input',
      dateInApp: new Date(parseInt(msg.mskey)),
      originalIndex: msg.originalIndex
    });
  }

  render() {
    return (
      <div className="calendar">
        <Page d={this.dateFromPage} />
        <Tasks
          recive={this.state.uid == 'Tasks'}
          data={this.state.dateForTask}
          text={this.state.textForTask}
          t={this.taskFromTasks}
          index={this.state.originalIndex}
        />
        <Input
          recive={this.state.uid == 'Input'}
          func={this.reciveFromChid}
          txt={this.state.taskInApp.val}
        />
      </div>
    )
  }
}







// export default App;
