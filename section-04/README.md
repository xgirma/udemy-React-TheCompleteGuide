# Section 4: Working with Lists and Conditionals

setState() Gate: Navigating React setState() Behavior Confusion
https://medium.com/javascript-scene/setstate-gate-abc10a9b2d82

```javascript
  showListToggleHandler = () => {
    this.setState((prevState) => ({
      showPersons: !prevState.showPersons
    }));
  };
```
