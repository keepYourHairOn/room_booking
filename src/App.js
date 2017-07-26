import React, { Component } from 'react';
import './App.css';
import Content from './components/Content.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div>Бронирование переговорок</div>
        </div>
        <Content/>
      </div>
    );
  }
}

export default App;
