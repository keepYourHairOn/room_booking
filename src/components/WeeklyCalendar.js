/**
 * Created by Sofiia Yermolaieva on 25.07.2017.
 */
import React, { Component } from 'react';
import arrow_LEFT from "../arrow_LEFT.png";
import arrow_right from "../arrow_right.png";

const MONTH = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август",
    "Сентябрь", "Октябрь","Ноябрь", "Декабрь"];
const WEEK_DAYS = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

class WeeklyCalendar extends Component {
    constructor(){
        super();
        this.state = {todaysDay: new Date(),
                        currentDay: ""};
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

    render(){
        let weekDay;

        if(this.state.currentDay === ""){
            weekDay = this.state.todaysDay;
        }else {
            weekDay = this.state.currentDay;
        }

        return (
            <div>
                <div id="month">{MONTH[weekDay.getMonth()]}</div>
                <button onClick={this.getPreviousWeek.bind(this)}><img src={arrow_LEFT} alt="Prev"/></button>
                <ul>
                    {
                        this.weekCalendar(weekDay).map(function(day, i){
                            return <li key={i}>{WEEK_DAYS[i + 1]} {day.getDate().toString()}</li>
                        })
                    }
                </ul>
                <button onClick={this.getNextWeek.bind(this)}><img src={arrow_right} alt="Next"/> </button>
            </div>
        );
    }
}

export default WeeklyCalendar;
