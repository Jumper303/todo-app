import React from 'react';
import './App.css';
import TableComponent from './components/TableComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Title">
          <br/>
          <h1>ToDo App</h1>
        </div>
        <TableComponent/>
      </header>
    </div>
  );
}

export default App;
