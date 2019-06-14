import React, {Component} from 'react';
import Person from "../Person";

class BindingClass extends Component {
  state = {
    person: [
      { name: "Max"},
      { name: "Min"},
      { name: "Avg"},
    ]
  };
  
  switchNameHandler = () => {
    this.setState({
      person: [
        { name: "Maximum"},
        { name: "Min"},
        { name: "Average"},
      ]
    })
  };
  
  nameChangeHandler = (event) => {
    this.setState({
      person: [
        { name: "Maximum"},
        { name: event.target.value},
        { name: "Average"},
      ]
    })
  };
  
  render() {
    return (
      <div className="App">
        <h3> Two way binding Class ... </h3>
        <button onClick={this.switchNameHandler}>Change Name</button>
        <Person name={this.state.person[0].name}
        >Seattle</Person>
        <Person
          name={this.state.person[1].name}
          click={this.switchNameHandler}
          changed={this.nameChangeHandler}>
          N/A
        </Person>
        <Person name={this.state.person[2].name}>Durham</Person>
      </div>
    )
  }
}

export default BindingClass;