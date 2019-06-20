import React, {Component} from 'react';
import Persons from './../components/Persons';

import './App.css';

class App extends Component {
  state = {
    persons:[
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasdf1', name: 'Min', age: 29 },
      { id: 'asdf11', name: 'Avg', age: 26 }
    ],
    showPerson: false
  };
  
  nameChange = (e, id) => {
    const index = this.state.persons.findIndex(p => p.id === id);
    const person = {...this.state.persons[index]};
    person.name = e.target.value;
    const persons = [...this.state.persons];
    persons[index] = person;
    this.setState({persons});
  };
  
  deletePerson = (index) => {
    const persons = [...this.state.person];
    persons.splice(index, 1);
    this.setState({persons});
  };
  
  togglePerson = () => {
    const doesShow = this.state.showPerson;
    this.setState({ showPerson: !doesShow});
  };
  
  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };
    
    let personsList = null;
    
    if(this.state.showPerson){
      personsList = (
        <Persons
          persons={this.state.persons}
          deletePerson={this.deletePerson}
          nameChange={this.nameChange}/>)
    }
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button
          style={style}
          onClick={this.togglePerson}>Toggle Persons</button>
        {personsList}
      </div>
    );
  }
}

export default App;
