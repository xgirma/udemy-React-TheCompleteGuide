import React from 'react';

const Person = (props) => {
  return (
    <div className="Person">
      <p onClick={props.click}> Name: {props.name}</p>
      <p> City: {props.children}</p>
      {/*<input type="text" onChange={props.changed} value={props.name}/>*/}
      <input type="text" onChange={props.changed}/>
    </div>
  );
};

export default Person;

