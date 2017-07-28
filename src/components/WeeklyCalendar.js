/**
 * Created by Sofiia Yermolaieva on 25.07.2017.
 */
import React, { Component } from 'react';
import arrow_LEFT from "../arrow_LEFT.png";
import arrow_right from "../arrow_right.png";
import plus_sign_icon from "../plus_sign_icon.png";
import '../App.css';

const MONTH = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август",
    "Сентябрь", "Октябрь","Ноябрь", "Декабрь"];
const WEEK_DAYS = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

const ROOMS = [
    {name: "Желтая", id:  0},
    {name: "Красная", id:  1},
    {name: "Зеленая", id:  2},
    {name: "Синяя", id:  3},
    {name: "Фиолетовая", id:  4},
];

const TIME_PERIODS = [
    {time: "9:00", id:  0},
    {time: "10:00", id:  1},
    {time: "11:00", id:  2},
    {time: "12:00", id:  3},
    {time: "13:00", id:  4},
    {time: "14:00", id:  5},
    {time: "15:00", id:  6},
    {time: "16:00", id:  7},
    {time: "17:00", id:  8},
    {time: "18:00", id:  9},
];

class WeeklyCalendar extends Component {
    constructor(){
        super();
        this.state = {todaysDay: new Date(),
                        currentDay: "",
                        bookedTime: this.getBookedTime()};
    }

    componentWillMount(){
        this.getBookedTime();
    }

    weekCalendar(dayToCount) {
        let day = dayToCount;
        let year = day.getFullYear();
        let month = day.getMonth();
        // will be needed for the blocking of booking ability
        let last_day = new Date(year, month + 1, 0);

        // day of the month - day of the week + 1
        //Monday
        let firstWorkingWeekDay = this.getFirstWorkingDay(day);

        let week = [];

        for(let i = 0; i < 5; i++){
            let weekDay;

            if(i === 0){
                weekDay = firstWorkingWeekDay;
            }else {
                weekDay = new Date(firstWorkingWeekDay.getFullYear(), firstWorkingWeekDay.getMonth(),
                    firstWorkingWeekDay.getDate() + i);
            }

            week[i] = weekDay;
        }

        return week;
    }

    getFirstWorkingDay(day){
        let dayToCount = day;
        let currentDay = dayToCount.getDate();
        let currentWeekDay = dayToCount.getDay();
        return new Date(dayToCount.setDate(currentDay - currentWeekDay + 1));
    }

    getPreviousWeek(){
        let curentWeekDay = this.getCurrentWeekDay();

        curentWeekDay = new Date(curentWeekDay.getFullYear(), curentWeekDay.getMonth(),
            curentWeekDay.getDate() - 7);

        this.setState({currentDay: curentWeekDay});
    }

    getNextWeek(){
        let curentWeekDay = this.getCurrentWeekDay();

        curentWeekDay = new Date(curentWeekDay.getFullYear(), curentWeekDay.getMonth(),
            curentWeekDay.getDate() + 7);

        this.setState({currentDay: curentWeekDay});
    }

    getCurrentWeekDay(){
        let curentWeekDay;
        if(this.state.currentDay === ""){
            curentWeekDay = this.state.todaysDay;
        }else {
            curentWeekDay = this.state.currentDay;
        }

        return curentWeekDay;
    }

    getAdjacentMonths(firstWeekDay, lastWeekDay){
        let months = [];
        months[0] = firstWeekDay.getMonth();

        if(firstWeekDay.getMonth() !== lastWeekDay.getMonth()){
            months[1] = lastWeekDay.getMonth();
            return months;
        }

        return months;
    }

    onBooking(dayKey) {
        // add class to the item with hidden button for booking and change color of the time
        // save date, room, time to the localStorage
        if(!localStorage.getItem(dayKey)) {
            localStorage.setItem(dayKey, dayKey);
        }

        this.getBookedTime();

    }

    getBookedTime(){
        let localStorageKeys = [];
        for ( var i = 0;  i < localStorage.length; i++ ) {
            console.log( localStorage.getItem(localStorage.key(i)));
            localStorageKeys.push(localStorage.getItem(localStorage.key(i)));
        }

        if (localStorageKeys.length > 0) {
            this.setState({bookedTime: localStorageKeys});
        }else {
            this.setState({bookedTime: null});
        }
    }

    render(){
        //localStorage.clear();

        let weekDay;

        if(this.state.currentDay === ""){
            weekDay = this.state.todaysDay;
        }else {
            weekDay = this.state.currentDay;
        }

        let week = this.weekCalendar(weekDay);
        let adjacentMonth = this.getAdjacentMonths(week[0], week[4]);
        let month;
        if(adjacentMonth.length === 2){
            month = <div id='month'>{MONTH[week[0].getMonth()]} / {MONTH[week[4].getMonth()]}</div>;
        }else {
            month = <div id='month'>{MONTH[weekDay.getMonth()]}</div>;
        }

        let bookingTime = [];
        let tmp;
        let day;
        let date;
        for(let i = 0; i < ROOMS.length; i++){
            tmp = [];
            for (let j = 0; j < week.length; j++){
                day = [];
                date = week[j].getFullYear().toString().concat(
                    week[j].getMonth().toString()).concat(
                        (week[j].getDate() + i).toString());
                for(let k = 0; k < TIME_PERIODS.length; k++){

                    let dayKey = ROOMS[i].id.toString().concat(date.toString().concat(k));
                    let button;
                    let bookedClass = "";

                    if((this.state.bookedTime == null || this.state.bookedTime.indexOf(dayKey) === -1) && week[j].getTime() >= this.state.todaysDay.getTime()){
                        button = <button className="bookingButton" onClick={this.onBooking.bind(this, dayKey)}><span className="plus">+</span></button>;
                    }else {
                        bookedClass = "bookedTime";
                    }
                    day.push(<Cell key={dayKey} className={"timePeriod " + bookedClass}>
                        <span>{TIME_PERIODS[k].time}</span>
                        {button}
                    </Cell>);
                }
                tmp.push(<Cell className="bookingDay">{day}</Cell>);
            }
            bookingTime[i] = <Cell><Cell className="roomName">{ROOMS[i].name}</Cell><Cell className="bookingWeek">{tmp}</Cell></Cell>;
        }

        return (
            <div>
                <Row className="calendar-header">
                    <Cell className="rooms-header">Комната</Cell>
                    <Cell className="month-header">
                        <Row>
                            <Cell className="left-button">
                                <button onClick={this.getPreviousWeek.bind(this)}><img src={arrow_LEFT} alt="Prev"/></button>
                            </Cell>
                            <Cell className="month-name">{month}</Cell>
                            <Cell className="right-button">
                                <button onClick={this.getNextWeek.bind(this)}><img src={arrow_right} alt="Next"/> </button>
                            </Cell>
                        </Row>
                        <Row>
                            <Cell className="week-days">
                                {
                                    week.map(function(day, i){
                                        return <Cell className="day" key={i}> {day.getDate().toString()} {WEEK_DAYS[i + 1]}</Cell>
                                    })
                                }
                            </Cell>
                        </Row>
                    </Cell>
                </Row>
                <Row className="booking">
                {
                    bookingTime.map(function(item, i){
                        return <Row className="roomWeek" key={i}>{item}</Row>
                    })
                }
                </Row>

            </div>
        );
    }
}

const Row = (props) => (
    <div {...props}
         className={['row', props.className].join(' ')}
    />
);

const Cell = (props) => (
    <div {...props}
         className={['cell', props.className].join(' ')}
    />
);


export default WeeklyCalendar;
