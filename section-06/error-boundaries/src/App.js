import React, {Component} from 'react';
import './App.css';

class BuggyCounter extends Component {
  state = {
    counter: 0
  };
  
  handleClick = () => {
    this.setState(({counter}) => ({counter: counter + 1}));
  };
  
  render(){
    if(this.state.counter === 5){
      throw new Error('I crashed');
    }
    
    return (
      <h1 className="App" onClick={this.handleClick}>
        {this.state.counter}
      </h1>
    );
  }
}

class ErrorBoundary extends Component {
  state = {
    error: null,
    errorInfo: null
  };
  
  componentDidCatch(error, errorInfo) {
    this.setState({error, errorInfo});
  }
  
  render(){
    if(this.state.error){
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </p>
        </div>
      );
    }
    
    return this.props.children;
  }
}

function App() {
  return (
    <div>
      <p>
        <b>
          This is an example of error boundaries in React 16.
          <br /><br />
          Click on the numbers to increase the counters.
          <br />
          The counter is programmed to throw when it reaches 5. This simulates a JavaScript error in a component.
        </b>
      </p>
  
      <ErrorBoundary>
        <p>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.</p>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>
  
      <p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
    </div>
  )
}

export default App;
