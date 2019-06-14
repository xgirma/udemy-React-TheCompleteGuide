import React, {useState} from 'react';
import Person from "../Person";

const StateFunc = props => {
  
  const [ personState, setPersonState ] = useState({
    person: [
      {name: "Max"},
      {name: "Min"},
      {name: "Avg"},
    ],
  });
  
  const [otherState, setOtherState] = useState({otherState: "other"});
  
  console.log(personState, otherState);
  
  const switchNameHandler = () => {
    setPersonState({
      person: [
        {name: "Maximum"},
        {name: "Min"},
        {name: "Average"},
      ]
    })
  };
  
  return (
    <div className="App">
      <h3> State Functional with hooks ... </h3>
      <button onClick={switchNameHandler}>Change Name</button>
      <Person name={personState.person[0].name}>Seattle</Person>
      <Person
        name={personState.person[1].name}
        click={switchNameHandler}>
        N/A
      </Person>
      <Person name={personState.person[2].name}>Durham</Person>
    </div>
  )
};

export default StateFunc;
