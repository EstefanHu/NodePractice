import React from 'react';
import './App.css';

import Todos from './components/Todos';

function App() {
  state = {
    todos: [
      {
        id: 1,
        title: 'Take out the trash',
        completed: false
      },
      {
        id: 2,
        title: 'Take out the dog',
        completed: false
      },
      {
        id: 3,
        title: 'Take out the hitman',
        completed: false
      }
    ]
  }

  return (
    <div className="App">
      <h1>Hello</h1>
      <Todos todos={this.state.todos} />
    </div>
  );
}

export default App;
