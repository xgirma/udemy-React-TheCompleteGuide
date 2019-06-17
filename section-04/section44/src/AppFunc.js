import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([
    {id: 1, name: 'Bob', city: 'Seattle'},
    {id: 2, name: 'Bar', city: 'Seattle'},
    {id: 3, name: 'Pop', city: 'Seattle'},
  ]);
  
  const [show, setShow] = useState(false);
  
  const toggleShow = () => {
    setShow(!show);
  };
  
  const changeName = (event, id) => {
    const unUpdated = persons.filter(p => p.id !== id);
    const [updated] = persons.filter(p => p.id === id);
    updated.name = event.target.value;
    unUpdated.push(updated);
    setPersons(unUpdated);
  
    // TODO
    // const p = persons;
    // const index = p.findIndex(p => p.id === id);
    // p[index].name = event.target.value;
    // setPersons(p);
  };
  
  const changeCity = (event, id) => {
    const unUpdated = persons.filter(p => p.id !== id);
    const [updated] = persons.filter(p => p.id === id);
    updated.city = event.target.value;
    unUpdated.push(updated);
    setPersons(unUpdated);
  };
  
  const removePerson = (id) => {
    const remaining = persons.filter(p => p.id !== id);
    setPersons(remaining);
  };
  
  return (
    <div className="App">
      <h1>List</h1>
      <button onClick={toggleShow}>
        {show ? 'Hide' : 'Show'}
      </button>
      <div>
        {show ? persons.map(person => {
          return <div key={person.id}>
            <div>
              <p>{person.id}: {person.name} is from {person.city}</p>
            </div>
            <div>
              <input type="text" onChange={(event) => changeName(event, person.id)}/>
              <input type="text" onChange={(event) => changeCity(event, person.id)}/>
            </div>
            <div>
              <button onClick={() => removePerson(person.id)}>X</button>
            </div>
          </div>
        }) : null}
      </div>
    </div>
  )
};

export default App;
