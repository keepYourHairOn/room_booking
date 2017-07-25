import React, { Component } from 'react';
import './App.css';
import Content from './components/Content.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Бронирование переговорок</h1>
        </div>
        <Content/>
      </div>
    );
  }
}

export default App;
