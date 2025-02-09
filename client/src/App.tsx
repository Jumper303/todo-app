import React from 'react';
import './App.css';
import TableComponent from './components/table-component';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Title">
          TODO App
        </div>
        <TableComponent/>
      </header>
    </div>
  );
}

export default App;
