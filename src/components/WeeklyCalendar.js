/**
 * Created by Sofiia Yermolaieva on 25.07.2017.
 */
import React, { Component } from 'react';

const MONTH = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август",
    "Сентябрь", "Октябрь","Ноябрь", "Декабрь"];
const WEEK_DAYS = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

class WeeklyCalendar extends Component {
    calendar() {
        let day = new Date();
        let year = day.getFullYear();
        let month = day.getUTCMonth();
        // will be needed for the blocking of booking ability
        let currentDay = day.getDate();
        let currentWeekDay = day.getDay();

        // day of the month - day of the week + 1
        //Monday
        let firstWorkingWeekDay = new Date(day.setDate(currentDay - currentWeekDay + 1));
        // first day + 4
        //Friday
        let lastWorkingWeekDay = new Date(day.setDate(firstWorkingWeekDay.getDate() + 4));

        let last_day = new Date(year, month + 1, 0);


        return "first day" + firstWorkingWeekDay.toUTCString() + " last day" + lastWorkingWeekDay.toUTCString();
    }

    render(){
        return (
            <div>{this.calendar()}</div>
        );
    }
}

export default WeeklyCalendar;
