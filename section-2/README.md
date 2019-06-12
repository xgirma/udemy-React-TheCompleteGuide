# Next Gen-JavaScript

## Class

Class = properties + method

Using ES6
```javascript
class Human {
  constructor(){
    this.gender = "Male";
  }
  
  getGender () {
    return this.gender;
  }
}

class Person extends Human {
  constructor(){ 
    super(); // superclass invocation 
    this.name = "Max"; // properties
    // this.gender = "Female"; // overriding
  }
 
  getName () { // method
    return this.name;
  }
}
```

Using ES7
```javascript
class Human {
  gender = "Male";
  
  
  getGender = () => {
    return this.gender;
  }
}

class Person extends Human {  
  name = "Max";  // properties
  // gender = "Female"; // overriding
 
  getName = () => { // method
    return this.name;
  }
}
```


Usage:

```javascript
var p = new Person();
console.log(p.name); // Max
console.log(p.getName()); // Max
console.log(p.getGender()); // Male/Female
```

## Copy by value and reference

### Primitives
Primitives (string, number, bigint, boolean, null, undefined, symbol (new in ECMAScript 2016).) copy by VALUE when assigned to another Primitive.  

```javascript
let num1 = 100;
let num2 = num1;
console.log(num2); // 100
num1 = 200;
console.log(num1); // 200
console.log(num2); // 100
```

All primitives are immutable, i.e., they cannot be altered.

```javascript
// Using a string method doesn't mutate the string
var bar = "baz";
console.log(bar); // baz
bar.toUpperCase();
console.log(bar); // baz

// Using an array method mutates the array
var foo = [];
console.log(foo); // []
foo.push("plugh");
console.log(foo); // ["plugh"]

// Assignment gives the primitive a new (not a mutated) value
bar = bar.toUpperCase(); // BAZ
```

**A primitive can be replaced, but it can't be directly altered.**

### Reference types

Reference types (objects and arrays) copy by REFERENCE when assigned to another reference type. 

```javascript
var person = {
  name: "Max"
}

var anotherPerson = person;

person.name = "Manu";

console.log(anotherPerson.name) // Manu
```

_anotherPerson_ have the same value as the first _person_ but it will not actually have copied the value of the person object. Instead, _anotherPerson_ store a pointer to the _person_ object in memory. 

The same apply for arrays. 

This is important in React. 

### Spread Operator

If you copy objects or arrays like the above and then you may manipulate one object in one place in the app and accidentally manipulate another usage of the same object in another place of the app, that could lead to unexpected behaviour.

Therefore, we will learn techniques to **copy this in an immutable way** which means we copy that by really copying the object and not just a pointer for that we can use this **spread operator**.


```javascript
var person = {
  name: "Max"
}

var anotherPerson = { ...person };

person.name = "Manu";

console.log(anotherPerson.name) // Max
```

It's just important to realize and to keep in mind that **objects and arrays are reference types**. **If you reassign them you're copying the pointer not the value**. Therefore, if you want to do this in a real copy way, **you will have to create a new object and just copy the properties and not the entire object**. That's something very important to keep in mind for this course.

### Map

```javascript
var count = [1, 2, 3];
var double = count.map(c => c * 2);
console.log(count); // [1, 2, 3]
console.log(double); // [2, 4, 6]

count.push(4);
console.log(count); // [1, 2, 3, 4]
console.log(double); // [2, 4, 6]
```

## ES6 Way to Clone an Array :sheep:
source: https://www.samanthaming.com/tidbits/35-es6-way-to-clone-an-array

When we need to copy an array, we often times used slice. But with ES6, you can also use the spread operator to duplicate an array. Pretty nifty, right. 

```javascript
const sheeps = [:sheep:, :sheep:, :sheep:];

// Old way
const cloneSheeps = sheeps.slice();

// ES6 way
const cloneSheepsES6 = [...sheeps];
```




