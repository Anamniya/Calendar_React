import React, { Component } from 'react';
import './index.css';

export default class Tasks extends Component {
  constructor(props) {
    super(props);
    this.removeTask = this.removeTask.bind(this)
    this.editTask = this.editTask.bind(this)
    // this.writeEdited = this.writeEdited.bind(this)
    this.state = {
      // textFromApp: props.text[0].toString()
      // dateFromApp: props.text[0]

      fullTask: {},
      taskArray: [],
      taskObject: {},
      mskey: ''
    }

    this.getEditValue = props.t
  }

  componentWillReceiveProps(nProps) {
    if (!nProps.recive) { return }
    
    if (parseInt(nProps.index) == -1) {
      this.addTask({
        textFromApp: nProps.text,
        dateFromApp: nProps.data
      })

    } else {
      this.writeEdited({
        textFromApp: nProps.text,
        dateFromApp: nProps.data,
        indexFromApp: parseInt(nProps.index)
      })
    }
  }

  render() {
    return (
      <div className="tasks">
        <div className="header">Tasks</div>
        {this.state.taskArray.map(task => {
          return <div className="task">
            <span onClick={() => this.editTask(task)}>
              <span className="sm_date"> &#8756;{task.date} </span>
              <span>{task.val}</span>
            </span>
            {/* <div className="delete" onClick={() => this.removeTask(task)}>x</div> */}
            <div className="delete" onClick={() => this.removeTask(task)}>x</div>
          </div>
        })}
      </div>
    )
  }

  addTask(msg) {
    if (msg.textFromApp !== "") {
      this.state.mskey = msg.dateFromApp.getTime();

      if (Object.keys(this.state.taskObject).indexOf(String(this.state.mskey)) == -1) {
        this.state.taskObject[this.state.mskey] = [];
      }
      this.state.taskObject[this.state.mskey].push(msg.textFromApp);
    }
    this.sort();
  }

  removeTask(task) {
    this.state.taskObject[task.mskey].splice(task.originalIndex, 1);
    if (this.state.taskObject[task.mskey].length == 0) {
      delete this.state.taskObject[task.mskey];
    }
    this.sort();
  }

  sort() {
    let keysSort = Object.keys(this.state.taskObject).sort(); //массив ключей в милисекундах (mskey)
    this.state.taskArray = [];
    for (let key of keysSort) {
      let values = this.state.taskObject[key];
      for (let index in values) {
        let value = values[index];
        let dateFromKey = new Date(parseInt(key));
        let deteForTask = [
          dateFromKey.getFullYear(),
          dateFromKey.getMonth() + 1,
          dateFromKey.getDate()
        ].join(".");
        this.state.taskArray.push({
          date: deteForTask,
          val: value,
          originalIndex: index,
          mskey: key
        });
      }
    }
    this.setState({
      taskArray: this.state.taskArray
    })
  }

  writeEdited(msg) {
    this.state.taskObject[msg.dateFromApp.getTime()][
      parseInt(msg.indexFromApp)
    ] = msg.textFromApp;
    this.sort();
  }

  editTask(task) {
    document.querySelector(".inp").classList.remove("hidden");
    this.getEditValue(task)
  }
}



