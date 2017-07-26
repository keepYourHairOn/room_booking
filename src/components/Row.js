/**
 * Created by Sofiia Yermolaieva on 26.07.2017.
 */
import React, { Component } from 'react';

class Row extends Component {
    render(){
        return(
            <div {this.props}
                 className={classNames('row', this.props.className)}
            />
        );
    }
}

export default Row;