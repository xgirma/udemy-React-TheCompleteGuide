import React, {Component} from 'react';
import Persons from './../components/Persons';
import Cockpit from './../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';

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
    showPerson: false,
    showCockpit: true,
    changeCounter: 0,
  };
  
  static getDerivedStateFromProps(props, state){
    console.log('+++++++++++++++++++++++++');
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
    
    // wrong
    // this.setState({persons, changeCounter: this.state.changeCounter + 1});
    
    // correct
    this.setState((prevState, props) => {
      return {persons, changeCounter: prevState.changeCounter + 1}
    });
  };
  
  deletePerson = (index) => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({persons});
  };
  
  togglePerson = () => {
    const doesShow = this.state.showPerson;
    this.setState({ showPerson: !doesShow});
    console.log('person toggle is clicked');
  };
  
  render() {
    console.log('[App.js] render');
    let personsList = null;
    
    if(this.state.showPerson){
      personsList = (
        <Persons
          persons={this.state.persons}
          deletePerson={this.deletePerson}
          nameChange={this.nameChange}/>)
    }
    return (
      <div>
        <button onClick={() => {this.setState({showCockpit:false})}}>Remove Cockpit</button>
        <h1>Hi, I'm a React App</h1>
        <p>{this.props.title}</p>
        
        {this.state.showCockpit ?
          <Cockpit toggle={this.togglePerson}/>
          : null}
        {personsList}
      </div>
    );
  }
}

export default withClass(App, "App");
