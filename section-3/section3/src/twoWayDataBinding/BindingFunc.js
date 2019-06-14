import React, {useState} from 'react';
import Person from "../Person";

const BindingFunc = () => {
  const [personState, setPersonState] = useState({
    person: [
      {name: "Max"},
      {name: "Min"},
      {name: "Avg"},
    ]
  });
  
  const switchNameHandler = () => {
    setPersonState({
      person: [
        {name: "Maximum"},
        {name: "Min"},
        {name: "Average"},
      ]
    })
  };
  
  const nameChangeHandler = (event) => {
    setPersonState({
      person: [
        {name: "Maximum"},
        {name: event.target.value},
        {name: "Average"},
      ]
    })
  };
  
  return (
    <div className="App">
      <h3> Two way binding Func ... </h3>
      <button onClick={switchNameHandler}>Change Name</button>
      <Person name={personState.person[0].name}
      >Seattle</Person>
      <Person
        name={personState.person[1].name}
        click={switchNameHandler}
        changed={nameChangeHandler}>
        N/A
      </Person>
      <Person name={personState.person[2].name}>Durham</Person>
    </div>
  )
}

export default BindingFunc;