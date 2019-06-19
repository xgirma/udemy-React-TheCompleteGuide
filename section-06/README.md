# Section 6: Debugging React Apps

## Error Boundaries

[official doc](https://reactjs.org/docs/error-boundaries.html) 

[official example](https://codepen.io/gaearon/pen/wqvxGa?editors=0011) 

Now sometimes, you have code which might fail at runtime and you know that but you can't guarantee that it always works. In this case you probably want to show a nice screen or at least a custom error message to the user.

**componentDidCatch**, this is a method which receives potential error and some additional information passed into it automatically by React.

Error boundary is a so-called higher order component, it's a component which simply wraps a component with the goal of handling any errors that component might throw.

Error boundary works in production mode for create-react-app. Only use error boundaries for cases where you know that it might fail and you can't control that.

```javascript
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
```

```html
      <ErrorBoundary>
        <p>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.</p>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>
```

```html
<p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
      <ErrorBoundary><BuggyCounter/></ErrorBoundary>
      <ErrorBoundary><BuggyCounter/></ErrorBoundary>
```

## Finding Logical Errors by using Dev Tools & Sourcemaps

[Debugging JavaScript in Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/javascript/)