import React from 'react';
import './App.css';
import TableComponent from './components/TableComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Title">
          <br/>
          TODO App
        </div>
        <TableComponent/>
      </header>
    </div>
  );
}

export default App;
