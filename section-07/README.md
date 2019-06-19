# Section 7: Diving Deeper into Components & React Internals

## Class-based vs Functional Components

<img width="736" alt="Class-based vs Functional Components" src="https://user-images.githubusercontent.com/5876481/59804416-1f105780-92a3-11e9-82b6-5ca35c93a5b7.png">

## class Component Lifecycle

<img width="736" alt="Screen Shot 2019-06-19 at 3 08 45 PM" src="https://user-images.githubusercontent.com/5876481/59804792-313ec580-92a4-11e9-90c7-2adadec76bd4.png">

### Creation

<img width="736" alt="Screen Shot 2019-06-19 at 3 14 59 PM" src="https://user-images.githubusercontent.com/5876481/59805049-086b0000-92a5-11e9-997c-68304ea58386.png">

component lifecycle is only available in class-based components. Functional components, when using React hooks have an equivalent. You could say generally, it's only available in class-based components.


#### component creation

because we actually have to differentiate between lifecycle hooks that run whenever something changes in our component. 

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
