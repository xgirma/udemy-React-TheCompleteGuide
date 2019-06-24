/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, Fragment, useContext} from 'react';
import AuthContext from '../../context/auth-context';

const Cockpit = (props) => {
  const authContext = useContext(AuthContext);
  
  console.log(authContext.authenticated);
  
  useEffect(() => {
    console.log('[Cockpit.js][FUNCTIONAL] useEffect', props);
    setTimeout(() => {
      alert('Saved data to cloud');
    }, 1000);
    
    return () => {
      console.log('[Cockpit.js][CLEANUP] cleanup work in useEffect');
    }
  },[]);
  
  const style = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  };
  
  return(
    <Fragment>
      <button
        style={style}
        onClick={() => props.toggle()}>Toggle Persons</button>
      {/*<AuthContext.Consumer>*/}
      {/*  {(context) => <button onClick={context.login} style={style}>Login</button>}*/}
      {/*</AuthContext.Consumer>*/}
      
      <button onClick={authContext.login} style={style}>Login</button>
    </Fragment>
  )
};

export default Cockpit;
