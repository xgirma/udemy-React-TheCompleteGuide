import React from 'react';
import Person from './Person';
import StateClass from './state/StateClass';
import StateFunc from './state/StateFunc';
import StateFuncData from './stateData/StateFuncData';
import StateClassDataWithBind from './stateData/StateClassDataWithBind';

const App = () => {
  return (
    <div className="App">
      <p> abc ... {Math.floor( Math.random() * (10 - 5) + 1) + 5}</p>
      <Person name="Max"> Seattle </Person>
      <StateClass/>
      <StateFunc/>
      <StateFuncData/>
      <StateClassDataWithBind/>
    </div>
  );
};

export default App;