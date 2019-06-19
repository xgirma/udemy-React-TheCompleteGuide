import React, {useState} from 'react';
import './App.css';

function App() {
  const [persons, setPersons] = useState([
    {id: '01', name: 'Bob0', city: 'City0'},
    {id: '02', name: 'Bob1', city: 'City1'},
    {id: '03', name: 'Bob2', city: 'City2'},
  ]);
  
  const [show, setShow] = useState(false);
  
  const toggleShow = () => {
    setShow(!show);
  };
  
  const changeName = (event, id) => {
    const index = persons.findIndex(person => person.id === id);
    const personsCopy = [...persons];
    personsCopy[index].name = event.target.value;
    setPersons(personsCopy);
  };
  
  const removePerson = (id) => {
    const newList = persons.filter(person => person.id !== id);
    setPersons(newList);
  };
  
  const style = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  };
  
  const personStyle = {
    width: '60%',
    margin: '16px auto',
    border: '1px solid #eee',
    boxShadow: '0 2px 3px #ccc',
    padding: '16px',
    textAlign: 'center',
  };
  
  const personList = (<div>
    {persons.map(person => {
      return <div key={person.id} style={personStyle}>
        <div>
          <p>{person.name} is from {person.city}</p>
        </div>
        
        <div>
          <input type='text' onChange={(event) => changeName(event, person.id)}/>
        </div>
        
        <div>
          <button style={style} onClick={() => removePerson(person.id)}>Remove</button>
        </div>
      </div>
    })}
  </div>);
  
  const classes = [];
  
  if(persons.length <= 2){ classes.push('red') }
  if(persons.length <= 1){ classes.push('bold') }
  
  return (
    <div className="App">
      <p className={classes.join(' ')}>Persons list</p>
      <button style={show? style: {...style, background: 'green'}} onClick={toggleShow}>{show ? 'Hide' : 'Show'}</button>
      <div>{show ? personList : null}</div>
    </div>
  );
}

export default App;
