import React from 'react';
import { TagExpression } from './TagExpression'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="content">
        <TagExpression
          fields={['name', 'age', 'gender']}
          operators={['==', '!=']}
          values={['1', '2', '3']}
          ops={['AND', 'OR']}
        />
        <h4>
          keyboard navigation:
        </h4>
        <ul>
          <li>Use tab and shift+tab to move between different tabs</li>
          <li>Use up/down arrow to select an option from dropdown menu</li>
          <li>Hit enter to delete a tag or make a selection </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
