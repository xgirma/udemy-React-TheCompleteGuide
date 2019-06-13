import React from 'react';
import Person from './Person';

const App = () => {
  return (
    <div className="App">
      <p> abc ... {Math.floor( Math.random() * (10 - 5) + 1) + 5}</p>
      <Person name="Max"> Seattle </Person>
    </div>
  );
};

export default App;