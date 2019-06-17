import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    persons: [
      {id: 1, name: 'Bob', city: 'Seattle'},
      {id: 2, name: 'Bar', city: 'Seattle'},
      {id: 3, name: 'Pop', city: 'Seattle'},
    ],
    show: false
  };
  
  toggleShow = () => {
    this.setState((prevState) => ({
      show: !prevState.show
    }));
  };
  
  changeName = (event, id) => {
    const persons = this.state.persons;
    const index = persons.findIndex(p => p.id === id);
    persons[index].name = event.target.value;
    
    this.setState({persons});
  };
  
  changeCity = (event, id) => {
    const persons = this.state.persons;
    const index = persons.findIndex(p => p.id === id);
    persons[index].city = event.target.value;
    
    this.setState({persons});
  };
  
  removePerson = (id) => {
    const persons = this.state.persons.filter(p => p.id !== id);
    this.setState({persons});
  };
  
  render() {
    const {persons, show} = this.state;
    
    const personsList = show ?
      <div>
        {persons.map(person => {
          return <div key={person.id}>
            <div>
              <p>{person.name} is from {person.city}</p>
            </div>
            <div>
              <input type="text" onChange={(event) => this.changeName(event, person.id)}/>
              <input type="text" onChange={(event) => this.changeCity(event, person.id)}/>
            </div>
            <div>
              <button onClick={() => this.removePerson(person.id)}>X</button>
            </div>
          </div>
        })}
      </div>
      : null;
      
    return (
      <div className="App">
        <h1>List</h1>
        <button onClick={this.toggleShow}>
          {show?'Hide':'Show'}
        </button>
        {personsList}
      </div>
    )
  }
}

export default App;
