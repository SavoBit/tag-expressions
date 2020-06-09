import React from 'react';
import { TagExpression } from './TagExpression'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="content">
        <TagExpression
          fields={['name', 'age', 'gender']}
          values={['1', '2', '3']}
          ops={['AND', 'OR']}
        />

      </div>
    </div>
  );
}

export default App;
