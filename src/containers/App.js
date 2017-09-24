import React, { Component } from 'react';
import AutoCRUDTable from './AutoCRUDTable';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <h1>React</h1>
        </div>
        <div className="content">
          <AutoCRUDTable url='someurl' />
        </div>
      </div>
    );
  }
}

export default App;