# Basic Features and Syntax

## JSX

### Class-based component

class-based components (also referred to as "**containers**", "**smart**" or "**stateful**" components) => class Cmp extends Component { render () { return <div>some JSX</div> } }

```javascript
import React, {Component} from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Abc ... </h1>
      </div>
    )
  }
}

export default App;
```

The class name here in the JSX looks like HTML. It lets us to write HTML-ish code. class is a reserved word in javascript, but used in HTML to assign css class name. className, div, h1 ... are provided by React, we are not using real HTML tags in JSX. 

### Functional component

Functional component in its simplest form a component is a function which returns some JSX. 

```javascript
import React from 'react';

function App() {
  return (
    <div className="App">
      <p> abc ... </p>
    </div>
  );
}

export default App;
```

React is require to compile the JSX. 

Functional components (also referred to as "**presentational**", "**dumb**" or "**stateless**" components - more about this later in the course) => const cmp = () => { return <div>some JSX</div> } (using ES6 arrow functions as shown here is recommended).

```javascript
import React from 'react';

const App = () => {
  return (
    <div className="App">
      <p> abc ... </p>
    </div>
  );
};

export default App;
```

Creating functional component it holds some advantages especially when it comes to the **this** keyword.

### createElement

```javascript
import React, {Component} from 'react';

class App extends Component {
  render() {
    return (
      React.createElement('div', { className: 'App' }, 
       React.createElement('p', null, 'Abc ...'))
    )
  }
}

export default App;
```

JSX is NOT HTML but it looks a lot like it. Differences can be seen when looking closely though (for example className in JSX vs class in "normal HTML"). **JSX is just syntactic sugar for JavaScript, allowing you to write HTMLish code instead of nested React.createElement(...) calls**.

JSX expression must have one parent element. 

### Component Naming

This is a convention React to name your component with a name which starts with the uppercase character. Because in JSX, all elements (components) starting with lowercase characters. JSX like div, h1, className are reserved for the native HTML elements.  

So you could create your own component which you named **Div** with uppercase D and then react could use that because it would not interfere with the normal JSX div component. For the same reason, you should give your Person component the uppercase character P so that React identifies it as a **custom-component**.

### Dynamic Content in JSX

Often, your templates, your jsx code should be dynamic, should output different things depending on the state of your application or user input.

```javascript
import React from 'react';

const App = () => {
  return (
    <div className="App">
      <p> abc ... {Math.floor(Math.random() * (10 - 5) + 1) + 5}</p>
    </div>
  );
};

export default App;
```

If we have some dynamic content in our JSX, which we want to run as javaScript code and not interpret as text, we have to wrap it in **single curly braces**.

### Props

```javascript
import React from 'react';

const Person = (props) => {
  return (
    <div className="Person">
      <p> Name: {props.name}</p>
    </div>
  );
};

export default Person;
```

Using props we have a reusable and dynamic component. 

### Props.children

```javascript
import React from 'react';

const Person = (props) => {
  return (
    <div className="Person">
      <p> Name: {props.name}</p>
      <p> City: {props.children}</p>
    </div>
  );
};

export default Person;
```

```javascript
import React from 'react';
import Person from './Person';

const App = () => {
  return (
    <div className="App">
      <p> abc ... {Math.floor( Math.random() * (10 - 5) + 1) + 5}</p>
      <Person name="Max"> Seattle </Person>
    </div>
  );
};

export default App;
```







