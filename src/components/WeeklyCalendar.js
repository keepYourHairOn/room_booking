/**
 * Created by Sofiia Yermolaieva on 25.07.2017.
 */
import React, { Component } from 'react';

const MONTH = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август",
    "Сентябрь", "Октябрь","Ноябрь", "Декабрь"];
const WEEK_DAYS = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

class WeeklyCalendar extends Component {
    constructor(){
        super();
        this.state = {day: new Date(),
                        month: new Date().getUTCMonth()};
    }

    weekCalendar(dayToCount) {
        let day = dayToCount;
        let year = day.getFullYear();
        let month = day.getMonth();
        // will be needed for the blocking of booking ability
        let currentDay = day.getDate();
        let currentWeekDay = day.getDay();
        let last_day = new Date(year, month + 1, 0);

        // day of the month - day of the week + 1
        //Monday
        let firstWorkingWeekDay = this.getFirstWorkingDay(day, currentDay, currentWeekDay);
        // first day + 4
        //Friday
        let lastWorkingWeekDay = this.getLastWorkingDay(day, firstWorkingWeekDay);

        let week = [];

        for(let i = 0; i < 5; i++){
            let weekDay;

            if(i == 0){
                weekDay = firstWorkingWeekDay;
            }else if(i == 4){
                weekDay = lastWorkingWeekDay;
            }else {
                weekDay = new Date();
                weekDay.setDate(firstWorkingWeekDay.getDate()+i);
            }

            week[i] = weekDay;
        }

        return week.toString();
    }

    getFirstWorkingDay(day, currentDay, currentWeekDay){
        return new Date(day.setDate(currentDay - currentWeekDay + 1));
    }

    getLastWorkingDay(day, firstWorkingWeekDay) {
        return new Date(day.setDate(firstWorkingWeekDay.getDate() + 4))
    }

    render(){
        
        return (
            <div>{this.weekCalendar(new Date())}</div>
        );
    }
}

export default WeeklyCalendar;
