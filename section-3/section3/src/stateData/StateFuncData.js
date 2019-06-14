import React, {useState} from 'react';
import Person from "../Person";

const StateFuncData = props => {
  
  const [ personState, setPersonState ] = useState({
    person: [
      {name: "Max"},
      {name: "Min"},
      {name: "Avg"},
    ],
  });
  
  const [otherState, setOtherState] = useState({otherState: "other"});
  
  console.log(personState, otherState);
  
  const switchNameHandler = (name) => {
    setPersonState({
      person: [
        {name: name[0]},
        {name: name[1]},
        {name: name[2]},
      ]
    })
  };
  
  return (
    <div className="App">
      <h3> State Functional with hooks ... </h3>
      <button onClick={() => switchNameHandler(['Maxx', 'Minn', 'Avgg'])}>
        Change Name
      </button>
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

export default StateFuncData;
