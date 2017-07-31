/**
 * Created by Sofiia Yermolaieva on 25.07.2017.
 */
import React, { Component } from 'react';
import arrow_LEFT from "../arrow_LEFT.png";
import arrow_right from "../arrow_right.png";
import plus_sign_icon from "../plus_sign_icon.png";
import '../App.css';

/*
 * Constant values for unchanged data.
 */
const MONTH = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август",
    "Сентябрь", "Октябрь","Ноябрь", "Декабрь"];
const WEEK_DAYS = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const SHORT_WEEK_DAYS = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const ROOMS = [
    {name: "Желтая", id:  0},
    {name: "Красная", id:  1},
    {name: "Зеленая", id:  2},
    {name: "Синяя", id:  3},
    {name: "Фиолетовая", id:  4},
];
const TIME_PERIODS = [
    {time: "09:00", id:  0},
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

/*
 * A custom class for calendar.
 */
class WeeklyCalendar extends Component {
    /*
     * Initial settings for the state of the class.
     */
    constructor(){
        super();
        this.state = {todaysDay: new Date(),
                        currentDay: "",
                        bookedTime: this.getBookedTime()};
    }

    /*
     * Get booked time before rendering of the component.
     */
    componentWillMount(){
        this.getBookedTime();
    }

    /*
     * Calculate all working days of the week, dayToCount belongs to.
     */
    weekCalendar(dayToCount) {
        let day = new Date(dayToCount.getTime());

        //Get Monday.
        let firstWorkingWeekDay = this.getFirstWorkingDay(day);

        let week = [];
        let weekDay;

        for(let i = 0; i < 5; i++){

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

    /*
     * Calculate date of the Monday of the week, day belongs to.
     */
    getFirstWorkingDay(day){
        let dayToCount = day;
        let currentDay = dayToCount.getDate();
        let currentWeekDay = dayToCount.getDay();
        return new Date(dayToCount.setDate(currentDay - currentWeekDay + 1));
    }

    /*
     * Calculate days of the week prior for the current one.
     */
    getPreviousWeek(){
        let curentWeekDay = this.getCurrentWeekDay();

        curentWeekDay = new Date(curentWeekDay.getFullYear(), curentWeekDay.getMonth(),
            curentWeekDay.getDate() - 7);

        this.setState({currentDay: curentWeekDay});
    }

    /*
     * Calculate days of the week subsequent for the current one.
     */
    getNextWeek(){
        let curentWeekDay = this.getCurrentWeekDay();

        curentWeekDay = new Date(curentWeekDay.getFullYear(), curentWeekDay.getMonth(),
            curentWeekDay.getDate() + 7);

        this.setState({currentDay: curentWeekDay});
    }

    /*
     * Get day of the week from the current date.
     */
    getCurrentWeekDay(){
        let curentWeekDay;
        if(this.state.currentDay === ""){
            curentWeekDay = new Date(this.state.todaysDay.getTime());
        }else {
            curentWeekDay = new Date(this.state.currentDay.getTime());
        }

        return curentWeekDay;
    }

    /*
     * Calculates index of the month adjacent to the current one.
     */
    getAdjacentMonths(firstWeekDay, lastWeekDay){
        let months = [];
        months[0] = firstWeekDay.getMonth();

        if(firstWeekDay.getMonth() !== lastWeekDay.getMonth()){
            months[1] = lastWeekDay.getMonth();
            return months;
        }

        return months;
    }

    /*
     * Booking button handler.
     * Saves booked time to the localStorage.
     */
    onBooking(dayKey) {
        if(!localStorage.getItem(dayKey)) {
            localStorage.setItem(dayKey, dayKey);
        }
        this.getBookedTime();
    }

    /*
     * Assigns booked time periods to the state of the component.
     */
    getBookedTime(){
        let localStorageKeys = [];
        for ( var i = 0;  i < localStorage.length; i++ ) {
            localStorageKeys.push(localStorage.getItem(localStorage.key(i)));
        }

        if (localStorageKeys.length > 0) {
            this.setState({bookedTime: localStorageKeys});
        }else {
            this.setState({bookedTime: null});
        }

    }

    /*
     * Blocks booking time if it is less or equal to the current time.
     */
    checkTime(bookingTimeId){
        let date = new Date();
        let hours = date.getHours();

        let index = -1;
        if(hours >= 9 && hours <= 18){
            if(bookingTimeId <= (TIME_PERIODS.length - (19 - hours))) {
                return bookingTimeId;
            }
        }

        return index;
    }

    render(){

        let weekDay;

        if(this.state.currentDay === ""){
            weekDay = new Date(this.state.todaysDay.getTime());
        }else {
            weekDay = new Date(this.state.currentDay.getTime());
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
        let bookingDays;
        let day;
        let date;
        let isValidDate;
        let date1;
        let date2 = new Date(this.state.todaysDay.getTime());

        //Fills in booking time for each rooms for all five working days of the week.
        for(let i = 0; i < ROOMS.length; i++){
            bookingDays = [];
            for (let j = 0; j < week.length; j++){
                day = [];
                date = week[j].getFullYear().toString().concat(
                    week[j].getMonth().toString()).concat(
                        (week[j].getDate() + i).toString());

                date1 = new Date(week[j].getTime());
                date1.setHours(0,0,0,0);
                date2.setHours(0,0,0,0);

                // Check whether the date has not expired.
                if(date1.getTime() >= date2.getTime()) {
                    isValidDate = true;

                }else {
                    isValidDate = false;
                }

                for(let k = 0; k < TIME_PERIODS.length; k++){

                    let dayKey = ROOMS[i].id.toString().concat(date.toString().concat(k));
                    let button;
                    let bookedClass = "";

                    let expiredTime = -1;

                    // Check whether time is expired.
                    if(date1.getTime() === date2.getTime()){
                        expiredTime = this.checkTime(k);
                    }

                    // If time belongs to the valid date, not expired, and is not booked
                    // then makes it available for booking.
                    // else mark it as booked.
                    if((this.state.bookedTime == null || this.state.bookedTime.indexOf(dayKey) === -1) &&
                        (isValidDate) && expiredTime === -1){
                        button = <button className="bookingButton" onClick={this.onBooking.bind(this, dayKey)}><span className="plus">+</span></button>;
                    }else {
                        bookedClass = "bookedTime";
                    }

                    day.push(<Cell key={dayKey} className={"timePeriod " + bookedClass}>
                        <span>{TIME_PERIODS[k].time}</span>{button}</Cell>);
                }

                bookingDays.push(<Cell className="bookingDay">{day}</Cell>);
            }

            bookingTime[i] = <Cell><Cell className="roomName">{ROOMS[i].name}</Cell><Cell className="bookingWeek">{bookingDays}</Cell></Cell>;
        }

        return (
            <div className="calendar-container">
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
                                        return <Cell className="day" key={i}> <span>{day.getDate().toString()}{'\u00A0'}</span> <span className="shortDayName">{SHORT_WEEK_DAYS[i + 1]}</span><span className="fullDayName">{WEEK_DAYS[i + 1]}</span></Cell>
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

/*
 * A custom element for emulating rows in the table.
 */
const Row = (props) => (
    <div {...props}
         className={['row', props.className].join(' ')}
    />
);

/*
 * A custom element for emulating cells in the row.
 */
const Cell = (props) => (
    <div {...props}
         className={['cell', props.className].join(' ')}
    />
);


export default WeeklyCalendar;
