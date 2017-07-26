/**
 * Created by Sofiia Yermolaieva on 26.07.2017.
 */
import React, { Component } from 'react';

class Cell extends Component {
    render() {
        return(
            <div {this.props}
                 className={classNames('cell', this.props.className)}
            />
        );
    }
}

export default Cell;