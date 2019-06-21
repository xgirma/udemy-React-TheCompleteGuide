# Section 7: Diving Deeper into Components & React Internals

## Class-based vs Functional Components

<img width="736" alt="Class-based vs Functional Components" src="https://user-images.githubusercontent.com/5876481/59804416-1f105780-92a3-11e9-82b6-5ca35c93a5b7.png">

## class Component Lifecycle

<img width="736" alt="Screen Shot 2019-06-19 at 3 08 45 PM" src="https://user-images.githubusercontent.com/5876481/59804792-313ec580-92a4-11e9-90c7-2adadec76bd4.png">

### Component creation lifecycle methods
<img width="736" alt="Screen Shot 2019-06-19 at 3 14 59 PM" src="https://user-images.githubusercontent.com/5876481/59805049-086b0000-92a5-11e9-997c-68304ea58386.png">

component lifecycle is only available in class-based components. Functional components, when using React hooks have an equivalent. You could say generally, it's only available in class-based components.

##### 1.1. constructor
So when a component is created, then first of all the constructor executes. Now this is actually not a React lifecycle hook, instead it's a default ES6 class feature.

This constructor will receive the props of this component and you have to call super props in the constructor. Only if you add it, so you don't have to add it just to make that call.

What is the constructor? You can do it for **basic initialization work**, for example for setting an initial state.

What you shouldn't do here is **cause side effects**.

Now the word side effect is relatively abstract, in the end it means things like sending a HTTP request or storing something in your local storage of the browser or sending some analytics to Google analytics.

You don't really want to do things like that in the constructor because that can impact performance and cause unnecessary re-render cycles which of course are pretty bad and you want to avoid. 

##### 1.2. getDerivedStateFromProps
Next getDerivedStateFromProps runs. That is a lifecycle hook that was added With React 16.3, whenever your props change for your class-based component, you can sink your state to them and that will actually be very rare niche cases. 

##### 1.3. render
We already know that, that is the method that returns JSX and that is really its job. You should use it only to prepare the data as you need it to lay out your JSX code and to render the HTML code. What you still shouldn't do in there is send HTTP requests or set any timeouts, so nothing which can block this rendering process. 

Now when render runs and you do render any other React components in this class-based component, then these child components will now be rendered.

So every child component you included in your rendered component here will then be rendered as well and only once all child components were rendered and that their lifecycle hooks finished, your lifecycle hook here will finish for the creation when componentDidMount gets called. 

##### 1.4. componentDidMount
componentDidMount is a very important lifecycle hook which you'll use a lot when you're working with class-based components because here, you can cause side effects.

That is a typical hook you would use for making an HTTP request to get new data from the web. **What you shouldn't do in here is update the state**, so don't call set state in here unless it's in, let's say the then block of a promise after you sent an HTTP request but don't call set state in here synchronously. So you can definitely set up some code that executes in the future which then updates the state, for example when the response from the server is back but don't do it right away when componentDidMount runs that you immediately call set state because that will trigger a re-render cycle and that is bad for performance.

<img width="736" alt="Screen Shot 2019-06-19 at 4 10 47 PM" src="https://user-images.githubusercontent.com/5876481/59807461-d9588c80-92ac-11e9-9f14-598de8ae5f5b.png">

componentDidMount executed only once.

<img width="736" alt="Screen Shot 2019-06-19 at 4 13 20 PM" src="https://user-images.githubusercontent.com/5876481/59807530-2dfc0780-92ad-11e9-879e-2a45cc5b9b7d.png">

```javascript
import React, {Component} from 'react';
import Persons from './../components/Persons';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js] [CREATE] constructor');
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
    console.log('+++++++++++++++++++++');
    console.log('[App.js] [CREATE] getDerivedStateFromProps', props);
    return state;
  }
  
  componentDidMount() {
    console.log('[App.js] [CREATE] componentDidMount');
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
    console.log('[App.js] [CREATE] render');
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
```

### Component update lifecycle methods
<img width="736" alt="Screen Shot 2019-06-19 at 4 21 40 PM" src="https://user-images.githubusercontent.com/5876481/59807818-5df7da80-92ae-11e9-8ff9-89174af692fc.png">

Just as we have a lifecycle for the component creation, we also have one for updating components. So when props or state change which are the two triggers you have for a component to be re-evaluated by React.

##### getDerivedStateFromProps
This lifecycle then starts with getDerivedStateFromProps being called, a lifecycle method which you'll not use too often, you would use it to initialize the state of a component that updates based on props you're getting, so updated props you're getting most likely and that could be for example some form control which gets external properties and then you internally want to handle user input but initialize your state or update your state based on outside changes and as you will see throughout this course, we'll not use that lifecycle hook because actually, you very very rarely need that and often there is a more elegant way of updating your state or of managing your components based on external properties.

You should not cause side effects in here so don't send any HTTP requests or anything like that.

##### shouldComponentUpdate
I use the term _lifecycle methods and lifecycle hooks_ interchangeably,

shouldComponentUpdate lifecycle method or hook here is interesting because it allows you to **cancel the updating process**.

So here you can decide whether or not React should continue evaluating and re-rendering the component.

Now why would you do that? For **performance optimization** as you will learn over the next lectures.

This should be used carefully because obviously, y**ou can break your components if you block an update from happening incorrectly** but it is very powerful since it allows you to also prevent unnecessary update cycles.

Must return true or false.

##### render
Now after that, the render method is called and React then goes through the JSX code, evaluates that and basically constructs its virtual DOM. Now there as always you prepare and structure your JSX code

React then goes ahead and updates **all child components** of this component, so it evaluates all the child components you have in your JSX code of the main component and of course every child component then also goes through that lifecycle if it receives new props or state.

##### getSnapshotBeforeUpdate
This is a lifecycle hook that takes the previous props and the previous state as input and that actually returns a snapshot object which you can freely configure and this also is a niche lifecycle hook which we'll not use too much, you use it for last minute DOM operations but with that, I don't really mean changes to the DOM but things like getting the current scrolling position of the user.

So imagine that your upcoming update of your component will re-render the DOM and will add new elements on the DOM and you therefore want to restore the scrolling position of the user wants the update is done.

Well then getSnapshotBeforeUpdate can give you that snapshot of the user state, so of the scrolling position right before the update happens and then you can consume and use that snapshot once the update is done to scroll the user back to where he was or anything like that.

##### componentDidUpdate
And last but not least once we're done with the update, componentDidUpdate is called. A lifecycle hook that signals that you are now done with the updating, that the render method has been executed and here you can now cause side effects, so here you could now make an HTTP request, though you'll have to **watch out to not enter an infinite loop** here if you make an HTTP request and you get back a response and you then update your component and then this cycle starts again and that is also something we'll have a look at later in this course

once we dive into HTTP requests because there, this is a typical problem you'll be facing. Now what you shouldn't do here outside of the, let's say then block of a promise of an HTTP request is updating the state with set state.

It's fine to do it as a result of some async task you're kicking off here but you should not call it synchronously in componentDidUpdate because that will simply lead to an unnecessary re-render cycle.

```javascript
import React, {Component} from 'react';
import Person from './Person/Person';

class Persons extends Component {
  state = {};
  
  static getDerivedStateFromProps(props, state){
    console.log('[Persons.js][CREATE] [UPDATE] getDerivedStateFormProps', props);
    return state;
  }
  
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('[Persons.js] [UPDATE] shouldComponentUpdate');
    return true;
  }
  
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] [UPDATE] getSnapshotBeforeUpdate');
    return null;
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] [UPDATE] componentDidUpdate');
  }
  
  render() {
    console.log('[Persons.js] [CREATE][UPDATE] render');
    
    return this.props.persons.map((person, index) => {
      return <Person
        key={person.id}
        click={() => this.props.deletePerson(index)}
        name={person.name}
        age={person.age}
        changed={(event) => this.props.nameChange(event, person.id)}
      />
    })
  };
}

export default Persons;
```

### lifecycle hooks for functional component
Before functional components were used as a presentational component. Now with the help of hooks you can actually build your entire app using functional components.

#### useEffect
useEffect is the second most important React hook you can use next to useState because useEffect basically **combines the functionality or the use cases you can cover of all these class-based lifecycle hooks**. 

You can add useEffect anywhere here in your functional component body and useEffect as a default takes a function that will **"run for every render cycle"**.

**SEE: 03-lifecycle-method-functional**
 
React will basically re-render app.js when we type because in app.js, we manage the state of the Persons components that state changes when we type and therefore it calls the render method of app.js

We have cockpit in app.js and so the cockpit gets re-rendered too. As always when I say **re-rendered**, I don't mean in the real DOM as you will learn but in that **virtual DOM**, React will check if it needs to touch the real DOM. We can prevent this. 

    useEffect <==> componentDidUpdate

So useEffect runs here, it runs for every update and this means _we can already use it for all the things we would have done_ in **componentDidUpdate** and indeed that is OK. If you need to send an HTTP request or anything like that in here, you can do that.

    useEffect <==> componentDidUpdate

useEffect also obviously runs when the component is created, right because if I quickly save this and I, it executed because it executes for every render cycle and that includes the first one. **So it is componentDidMount and componentDidUpdate combined in one effect**.

Now some hooks like **getDerivedStateFromProps** is not included in here but you also don't really need it because if you have props here and you want to base your state on that, well then you can **useState** and pass some data from your props as an initial state into this, right? So you have that built into this because it is a functional component per definition. useEffect is for the other, more important and useful lifecycle hooks I'd say.

    using useEffect for first render only

Now what if we were to send an HTTP request here but we only want to do that when the component is rendered for the **first time only** and not for every re-render cycle. 

Well for that, you can add a **second argument here to useEffect**, that second argument is an array where you simply point at all the variables or all the data that actually are used in your effect. 

```javascript
  useEffect(() => {
    console.log('[Cockpit.js][FUNCTIONAL] useEffect', props);
    setTimeout(() => {
      alert('Saved data to cloud');
    }, 1000)
  },[]);
```

you can pass an empty array, you have to pass an array, that's important but it's empty. This tells React this effect has **no dependencies** and it should rerun whenever one of the dependencies changes. Now if you have no dependencies, they can never change and therefore this can never rerun, it will run for the first time, that is the default but it will never run again.

So if you just need **componentDidMount**, you would use useEffect with an empty array passed as a second argument to the useEffect function. If you have a dependency on a certain field, you do what we did before, you pass that field in here and of course, you can have multiple fields you will depend on.

### Component cleanup lifecycle methods

    class: componentWillUnmount()
    functional: useEffect()
    
```javascript
import React, {Component} from 'react';
import Person from './Person/Person';

class Persons extends Component {
  state = {};
  
  static getDerivedStateFromProps(props, state){
    console.log('[Persons.js][CREATE] [UPDATE] getDerivedStateFormProps', props);
    return state;
  }
  
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('[Persons.js] [UPDATE] shouldComponentUpdate');
    return true;
  }
  
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] [UPDATE] getSnapshotBeforeUpdate');
    return null;
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] [UPDATE] componentDidUpdate');
  }
  
  componentWillUnmount() {
    console.log('[Persons.js][CLEANUP] componentWillUnmount');
  }
  
  render() {
    console.log('[Persons.js] [CREATE][UPDATE] render');
    
    return this.props.persons.map((person, index) => {
      return <Person
        key={person.id}
        click={() => this.props.deletePerson(index)}
        name={person.name}
        age={person.age}
        changed={(event) => this.props.nameChange(event, person.id)}
      />
    })
  };
}

export default Persons;
```

<img width="736" alt="Screen Shot 2019-06-20 at 4 11 16 PM" src="https://user-images.githubusercontent.com/5876481/59886964-2a808300-9376-11e9-8432-d3df707b8cf4.png">

````javascript
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';

const Cockpit = (props) => {
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
    <div>
      <button
        style={style}
        onClick={() => props.toggle()}>Toggle Persons</button>
    </div>
  )
};

export default Cockpit;
````

<img width="736" alt="Screen Shot 2019-06-20 at 4 14 02 PM" src="https://user-images.githubusercontent.com/5876481/59887008-70d5e200-9376-11e9-8dd0-c99ff0f55ba8.png">

### Optimization 
    class: componentShouldUpdate()
    functional: React.memo()
    
Abc ...