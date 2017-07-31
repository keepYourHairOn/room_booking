/**
 * Created by Sofiia Yermolaieva on 25.07.2017.
 */
import React, { Component } from 'react';
import WeeklyCalendar from './WeeklyCalendar.js';

/*
 * A wrapper custom component for the content of the application.
 */
class Content extends Component {
    render(){
        return (
            <WeeklyCalendar/>
        );
    }
}

export default Content;