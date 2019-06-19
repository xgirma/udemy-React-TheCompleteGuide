# Section 3: Understanding the Base Features & Syntax

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

# State

**state** simply is a **property of the component class**, you have to call it state though - the name is not optional.

props are set and passed from outside into the person component, **state is managed from inside a component**.

Note: **state property is only available in components that extend components**, i.e. class-based React components.

React 16.8 released new feature called **React-hooks**, to manage state in functional components.

Whilst props allow you to pass data down the component tree (and hence trigger an UI update), state is used to change the component, state from within. Changes to state also trigger an UI update.

```javascript
import React, {Component} from 'react';
import Person from "../Person";

class StateClass extends Component {
  state = {
    person: [
      { name: "Max"},
      { name: "Min"},
      { name: "Avg"},
    ]
  };
  
  render() {
    return (
      <div className="App">
        <h1> State Class ... </h1>
        <button>Change Name</button>
        <Person name={this.state.person[0].name}>Seattle</Person>
        <Person name={this.state.person[1].name}>N/A</Person>
        <Person name={this.state.person[2].name}>Durham</Person>
      </div>
    )
  }
}

export default StateClass;
```

State can be changed and when it changed it lead React to re-render our DOM or to update the DOM.

Whenever state changes (taught over the next lectures), the component will re-render and reflect the new state. The difference to props is, that this happens within one and the same component - **you don't receive new data** (props ) from outside!

# Methods, Handlers, ... 

```javascript
import React, {Component} from 'react';
import Person from "../Person";

class StateClass extends Component {
  state = {
    person: [
      { name: "Max"},
      { name: "Min"},
      { name: "Avg"},
    ]
  };
  
  switchNameHandler = () => { // event handler naming convention
    console.log('clicked');
  };
  
  render() {
    return (
      <div className="App">
        <h1> State Class ... </h1>
        <button onClick={this.switchNameHandler}>Change Name</button>
        
        <Person name={this.state.person[0].name}>Seattle</Person>
        <Person name={this.state.person[1].name}>N/A</Person>
        <Person name={this.state.person[2].name}>Durham</Person>
      </div>
    )
  }
}

export default StateClass;
```
**switchNameHandler**, the first part Switch Name is totally up to you but you typically use **handler** here to indicate that this is a method you're not actively calling but you're **assigning as an event-handler**.

_<button onClick={this.switchNameHandler()}>Change Name</button>_ This would **execute it immediately** when react renders this component to the DOM because you execute this function with the **parentheses**.

_<button onClick={this.switchNameHandler}>Change Name</button>_ This would **not execute it immediately** when react renders this component to the DOM. We only want to **pass a reference** and we do this by using this and then **referring to that property** which holds a function. 

# Events
[Official React SyntheticEvent](https://reactjs.org/docs/events.html#supported-events)

# Change state, setState
We haven't defined setState method but we extend component and setState is made available by the React library and the component object happens to have a setState method.

setState takes an object as an argument and it merge whatever we define in setState with the existing state.

```javascript
import React, {Component} from 'react';
import Person from "../Person";

class StateClass extends Component {
  state = {
    person: [
      { name: "Max"},
      { name: "Min"},
      { name: "Avg"},
    ]
  };
  
  switchNameHandler = () => {
    console.log('clicked');
    this.setState({
      person: [
        { name: "Maximum"},
        { name: "Min"},
        { name: "Average"},
      ]
    })
  };
  
  render() {
    return (
      <div className="App">
        <h1> State Class ... </h1>
        <button onClick={this.switchNameHandler}>Change Name</button>
        <Person name={this.state.person[0].name}>Seattle</Person>
        <Person name={this.state.person[1].name}>N/A</Person>
        <Person name={this.state.person[2].name}>Durham</Person>
      </div>
    )
  }
}

export default StateClass;
```

There are not many things which lead React to update the DOM. There actually only are two, changing state and what else? props.

# Functional component, React hooks

```javascript
import React, {useState} from 'react';
import Person from "../Person";

const StateFunc = props => {
  
  const [ personState, setPersonState ] = useState({
    person: [
      {name: "Max"},
      {name: "Min"},
      {name: "Avg"},
    ],
    otherState: 'other'
  });
  
  const switchNameHandler = () => {
    setPersonState({
      person: [
        {name: "Maximum"},
        {name: "Min"},
        {name: "Average"},
      ]
    })
  };
  
  return (
    <div className="App">
      <h1> State Functional with hooks ... </h1>
      <button onClick={switchNameHandler}>Change Name</button>
      <Person name={personState.person[0].name}>Seattle</Person>
      <Person name={personState.person[1].name}>N/A</Person>
      <Person name={personState.person[2].name}>Durham</Person>
    </div>
  )
};

export default StateFunc;
```

If I clicks Change Name, we get the new state and oh, otherState is missing and that is super important. When you're using React hooks, your function here which you get as the second element in that array does not merge whatever you pass to it with the old state, **instead it replaces the old state** with it and this is super important because **this means that whenever you're updating the state like this, you have to manually make sure you include all old state data**.

```javascript
import React, {useState} from 'react';
import Person from "../Person";

const StateFunc = props => {
  
  const [ personState, setPersonState ] = useState({
    person: [
      {name: "Max"},
      {name: "Min"},
      {name: "Avg"},
    ],
    otherState: 'other'
  });
  
  console.log(personState);
  
  const switchNameHandler = () => {
    setPersonState({
      person: [
        {name: "Maximum"},
        {name: "Min"},
        {name: "Average"},
      ],
      otherState: personState.otherState // adding
    })
  };
  
  return (
    <div className="App">
      <h1> State Functional with hooks ... </h1>
      <button onClick={switchNameHandler}>Change Name</button>
      <Person name={personState.person[0].name}>Seattle</Person>
      <Person name={personState.person[1].name}>N/A</Person>
      <Person name={personState.person[2].name}>Durham</Person>
    </div>
  )
};

export default StateFunc;
```

Using **multiple useState** with different state slices is how we manage state in a functional component with React hooks.

You **don't have one big state object**, though you could and you could manually merge it if you prefer that but instead, you have multiple separated state slices.

```javascript
import React, {useState} from 'react';
import Person from "../Person";

const StateFunc = props => {
  
  const [ personState, setPersonState ] = useState({
    person: [
      {name: "Max"},
      {name: "Min"},
      {name: "Avg"},
    ],
  });
  
  const [otherState, setOtherState] = useState({otherState: "other"});
  
  console.log(personState, otherState);
  
  const switchNameHandler = () => {
    setPersonState({
      person: [
        {name: "Maximum"},
        {name: "Min"},
        {name: "Average"},
      ]
    })
  };
  
  return (
    <div className="App">
      <h1> State Functional with hooks ... </h1>
      <button onClick={switchNameHandler}>Change Name</button>
      <Person name={personState.person[0].name}>Seattle</Person>
      <Person name={personState.person[1].name}>N/A</Person>
      <Person name={personState.person[2].name}>Durham</Person>
    </div>
  )
};

export default StateFunc;
```

## Stateful and stateless component
Stateful = (container) ...

Stateless (dumb, presentational, functional) ...  

Since React 16.8, you can manage state in every component. Prior to that version, you could only manage state in class-based components.

Now either way, no matter if you're creating a component with the **class keyword** or as a **functional** component, you can manage state in it, either with the **state** property and **this.setState** or with the React **useState** hook.

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

This person component is a stateless component because it has no internal state management and it is also called dumb because they have no internal logic or presentational components because they present something, they output content, they only get external data and output it in a structured way.

Restrict yourself to a setup where you have way **more functional presentational components than stateful components**. Because this makes your app easier to maintain and manage. You have a clear flow of data and it's very clear where your main logic sits and where your data changes.

If every component in your app manages its own state, you quickly end up with spaghetti code where everyone is doing everything and that can make your app very hard to reuse, to maintain and so on.

## Passing method reference between components


```javascript
import React, {useState} from 'react';
import Person from "../Person";

const StateFunc = props => {
  
  const [ personState, setPersonState ] = useState({
    person: [
      {name: "Max"},
      {name: "Min"},
      {name: "Avg"},
    ],
  });
  
  const [otherState, setOtherState] = useState({otherState: "other"});
  
  console.log(personState, otherState);
  
  const switchNameHandler = () => {
    setPersonState({
      person: [
        {name: "Maximum"},
        {name: "Min"},
        {name: "Average"},
      ]
    })
  };
  
  return (
    <div className="App">
      <h1> State Functional with hooks ... </h1>
      <button onClick={switchNameHandler}>Change Name</button>
      <Person name={personState.person[0].name}>Seattle</Person>
      <Person
        name={personState.person[1].name}
        click={switchNameHandler}>
        N/A
      </Person> // :)
      <Person name={personState.person[2].name}>Durham</Person>
    </div>
  )
};

export default StateFunc;
``` 
This is something important to understand, an important pattern, **you can pass methods** also as props so that you can call a method **which might change the state in another component** which doesn't have direct access to the state.

```javascript
import React from 'react';

const Person = (props) => {
  return (
    <div className="Person">
      <p onClick={props.click}> Name: {props.name}</p>
      <p> City: {props.children}</p>
    </div>
  );
};

export default Person;
```

**It's a common pattern and it's important to know, you can pass down click handlers which allow you to change data in the parent component.**

```javascript
import React, {useState} from 'react';
import Person from "../Person";

const StateFunc = props => {
  
  const [ personState, setPersonState ] = useState({
    person: [
      {name: "Max"},
      {name: "Min"},
      {name: "Avg"},
    ],
  });
  
  const [otherState, setOtherState] = useState({otherState: "other"});
  
  console.log(personState, otherState);
  
  const switchNameHandler = () => {
    setPersonState({
      person: [
        {name: "Maximum"},
        {name: "Min"},
        {name: "Average"},
      ]
    })
  };
  
  return (
    <div className="App">
      <h1> State Functional with hooks ... </h1>
      <button onClick={switchNameHandler}>Change Name</button>
      <Person name={personState.person[0].name}>Seattle</Person>
      <Person
        name={personState.person[1].name}
        click={switchNameHandler}>
        N/A
      </Person>
      <Person name={personState.person[2].name}>Durham</Person>
    </div>
  )
};

export default StateFunc;
```
Now how do we pass that data?

There are two ways of doing that, using bind or arrow function.

Functional 
```javascript
import React, {useState} from 'react';
import Person from "../Person";

const StateFuncData = props => {
  
  const [ personState, setPersonState ] = useState({
    person: [
      {name: "Max"},
      {name: "Min"},
      {name: "Avg"},
    ],
  });
  
  const [otherState, setOtherState] = useState({otherState: "other"});
  
  console.log(personState, otherState);
  
  const switchNameHandler = (name) => {
    setPersonState({
      person: [
        {name: name[0]},
        {name: name[1]},
        {name: name[2]},
      ]
    })
  };
  
  return (
    <div className="App">
      <h3> State Functional with hooks ... </h3>
      <button onClick={() => switchNameHandler(['Maxx', 'Minn', 'Avgg'])}>
        Change Name
      </button>
      <Person name={personState.person[0].name}>Seattle</Person>
      <Person
        name={personState.person[1].name}
        click={switchNameHandler}>
        N/A
      </Person>
      <Person name={personState.person[2].name}>Durham</Person>
    </div>
  )
};

export default StateFuncData;
```

Class
```javascript
import React, {Component} from 'react';
import Person from "../Person";

class StateClassData extends Component {
  state = {
    person: [
      { name: "Max"},
      { name: "Min"},
      { name: "Avg"},
    ]
  };
  
  switchNameHandler = (name) => {
    console.log('clicked');
    this.setState({
      person: [
        {name: name[0]},
        {name: name[1]},
        {name: name[2]},
      ]
    })
  };
  
  render() {
    return (
      <div className="App">
        <h3> State Class ... </h3>
        <button onClick={() => this.switchNameHandler(['Maxx', 'Minn', 'Avgg'])}>
          Change Name
        </button>
        <Person name={this.state.person[0].name}>Seattle</Person>
        <Person
          name={this.state.person[1].name}
          click={this.switchNameHandler}>
          N/A
        </Person>
        <Person name={this.state.person[2].name}>Durham</Person>
      </div>
    )
  }
}

export default StateClassData;
```

Using the .bind

```javascript
import React, {Component} from 'react';
import Person from "../Person";

class StateClassDataWithBind extends Component {
  state = {
    person: [
      { name: "Max"},
      { name: "Min"},
      { name: "Avg"},
    ]
  };
  
  switchNameHandler = (name) => {
    this.setState({
      person: [
        {name: name[0]},
        {name: name[1]},
        {name: name[2]},
      ]
    })
  };
  
  render() {
    return (
      <div className="App">
        <h3> State Class with Bind ... </h3>
        <button onClick={this.switchNameHandler.bind(this,['Maxx', 'Minn', 'Avgg'])}>
          Change Name
        </button>
        <Person name={this.state.person[0].name}>Seattle</Person>
        <Person
          name={this.state.person[1].name}
          click={this.switchNameHandler}>
          N/A
        </Person>
        <Person name={this.state.person[2].name}>Durham</Person>
      </div>
    )
  }
}

export default StateClassDataWithBind;
``` 
Opinion: using .bind is considered perform better than using arrow function.

# Two way data-binding   