import React, { Component } from 'react';
import './index.css';

export default class Page extends Component {
  constructor(props) {
    super(props);

    this.next = this.next.bind(this);
    this.prew = this.prew.bind(this);
    this.open = this.open.bind(this);

    this.state = {
      year: new Date().getFullYear(),
      curMonth: new Date().getMonth(),
      curDate: new Date().getDate(),
      months: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
      days: [],
      monthForToday: new Date().getMonth(),
      yearForToday: new Date().getFullYear(),
      fullDate: ''
    }
    this.sendDate = props.d
  }

  componentDidMount() {
    this.genCalendar()
  }

  render() {
    return (
      <div className="wrapper">
        <div className="month">{this.state.months[this.state.curMonth]} | {this.state.year}</div>
        <div className="d_of_w">
          <div className="day">M</div>
          <div className="day">T</div>
          <div className="day">W</div>
          <div className="day">T</div>
          <div className="day">F</div>
          <div className="day">S</div>
          <div className="day">S</div>
        </div>
        <div className="container">
          {this.state.days.map(value => {
            return <div className="days" onClick={this.open}>{value}</div>
          })}
        </div>
        <nav className="prew btn" onClick={this.prew}>
          <div className="btn_txt">&#60;</div>
        </nav>
        <nav className="next btn" onClick={this.next}>
          <div className="btn_txt">&#62;</div>
        </nav>
      </div>
    )
  }
  genCalendar() {
    let days = [];
    let lastDayInMonth = new Date(this.state.year, this.state.curMonth + 1, 0).getDate();
    let firstDayOfWeek = [7, 1, 2, 3, 4, 5, 6][
      new Date(this.state.year, this.state.curMonth, 1).getDay()
    ];

    for (let i = 1; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDayInMonth; i++) {
      days.push(i);
    }
    this.setState({ days: days })
  };

  next() {
    this.state.curMonth = this.state.curMonth < 11 ? this.state.curMonth + 1 : 0;
    if (this.state.curMonth == 0) {
      this.state.year = this.state.year + 1;
    }
    this.genCalendar();
  };

  prew() {
    this.state.curMonth = this.state.curMonth > 0 ? this.state.curMonth - 1 : 11;
    if (this.state.curMonth == 11) {
      this.state.year = this.state.year - 1;
    }
    this.genCalendar();
  };

  open(e) {
    document.querySelector(".inp").classList.remove("hidden");
    let selDate = e.target.textContent;
    // let fullDate = new Date([this.state.year, this.state.curMonth + 1, selDate].join('.'))
    let fullDate = new Date([this.state.year, this.state.curMonth + 1, selDate])
    this.sendDate(fullDate)
  }

}
