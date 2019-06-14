import React, {Component} from 'react';
import Person from "../Person";

class StateClassData extends Component {
  state = {
    person: [
      { name: "Max"},
      { name: "Min"},
      { name: "Avg"},
    ]
  };
  
  switchNameHandler = (name) => {
    console.log('clicked');
    this.setState({
      person: [
        {name: name[0]},
        {name: name[1]},
        {name: name[2]},
      ]
    })
  };
  
  render() {
    return (
      <div className="App">
        <h3> State Class ... </h3>
        <button onClick={() => this.switchNameHandler(['Maxx', 'Minn', 'Avgg'])}>
          Change Name
        </button>
        <Person name={this.state.person[0].name}>Seattle</Person>
        <Person
          name={this.state.person[1].name}
          click={this.switchNameHandler}>
          N/A
        </Person>
        <Person name={this.state.person[2].name}>Durham</Person>
      </div>
    )
  }
}

export default StateClassData;