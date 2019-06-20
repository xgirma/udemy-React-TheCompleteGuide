import React, {Component} from 'react';
import Persons from './../components/Persons';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js] constructor');
  }
  
  state = {
    persons:[
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasdf1', name: 'Min', age: 29 },
      { id: 'asdf11', name: 'Avg', age: 26 }
    ],
    showPerson: false
  };
  
  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }
  
  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }
  
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
    console.log('[App.js] render');
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
        <p>{this.props.title}</p>
        <button
          style={style}
          onClick={this.togglePerson}>Toggle Persons</button>
        {personsList}
      </div>
    );
  }
}

export default App;
