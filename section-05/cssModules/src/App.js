import React, {Component} from 'react';
import './App.css';
import Persons from "./Persons";

class App extends Component {
  state = {
    persons: [
      {id: "g1", name: "Sofia", city: 'Seattle'},
      {id: "m1", name: "Thomas", city: 'Bellevue'},
      {id: "g2", name: "Maria", city: 'Durham'},
    ],
    show: false
  };
  
  showListToggleHandler = () => {
    this.setState((prevState) => ({
      show: !prevState.show
    }));
  };
  
  updateHandler = (personUpdate) => {
    if(personUpdate){
      const unchanged = this.state.persons.filter(person =>
        person.id !== personUpdate.id);
      
      this.setState({
        persons: [personUpdate, ...unchanged]
      });
    }
  };
  
  removePersonHandler = (personToRemove) => {
    this.setState({
      persons: this.state.persons.filter(person =>
        person.id !== personToRemove.id)
    });
  };
  
  render() {
    const pStyle = {textAlign: 'center'};
    const { show, persons } = this.state;
  
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };
    
    return (
        <div style={pStyle}>
          <h3 style={style}>LIST of PEOPLE</h3>
          <button onClick={this.showListToggleHandler}>{
            show ? 'Hide' : 'Show'
          }</button>
          <Persons persons={persons}
                   show={show}
                   update={(person) => this.updateHandler(person)}
                   remove={(person) => this.removePersonHandler(person)}/>
        </div>
    )
  }
}

export default App;
