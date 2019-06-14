import React from 'react';

const UserOutput = (props) => {
    return (
      <div>
        <p> Add styling of your choice to your components/ elements in the components - both with inline styles and stylesheets. Add styling of your choice to your components/ elements in the components - both with inline styles and stylesheets.</p>
        
        <p>Ensure that the new input entered by the user overwrites the old username passed to UserOutput. Ensure that the new input entered by the user overwrites the old username passed to UserOutput.</p>
  
        <p> USERNAME: {props.name} </p>
        <p> PASSWORD: {props.pass} </p>
      </div>
    )
};

export default UserOutput;