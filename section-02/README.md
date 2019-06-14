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

console.log(person.name); // Manu
console.log(anotherPerson.name); // Manu

anotherPerson.name = "Bob"

console.log(person.name); // Bob
console.log(anotherPerson.name); // Bob
```

_anotherPerson_ have the same value as the first _person_ but it will not actually have copied the value of the person object. Instead, _anotherPerson_ store a pointer to the _person_ object in memory. 

The same apply for arrays. Can you see the problem here? When we change new-object, we also automatically change the old-object. Vise-versa. This is because they both refer to the same object in memory. In most cases this is unwanted behaviour and bad practice.

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

## ES6 Way to Clone an Array (copy by value)
source: https://www.samanthaming.com/tidbits/35-es6-way-to-clone-an-array

When we need to copy an array, we often times used slice. But with ES6, you can also use the spread operator to duplicate an array. Pretty nifty, right. 

```javascript
const sheeps = [1, 2, 3];

// Old way
const cloneSheeps = sheeps.slice();

// ES6 way
const cloneSheepsES6 = [...sheeps];

console.log(sheeps === cloneSheeps); // false
console.log(sheeps === cloneSheepsES6); // false
```

### Why Can’t I Use = to Copy an Array?
Because arrays in JS are reference values, so when you try to copy it using the = it will only copy the reference to the original array and not the value of the array. To create a real copy of an array, you need to copy over the value of the array under a new value variable. That way this new array does not reference to the old array address in memory.

```javascript
const sheeps = [1, 2, 3];

const fakeSheeps = sheeps;
const cloneSheeps = [...sheeps];

console.log(sheeps === fakeSheeps);
// true --> it's pointing to the same memory space

console.log(sheeps === cloneSheeps);
// false --> it's pointing to a new memory space
```

### Problem with Reference Values
If you ever dealt with Redux or any state management framework. You will know immutability is super important. Let me briefly explain. An immutable object is an object where the state can't be modified after it is created. The problem with JavaScript is that arrays are mutable. So this can happen:

```javascript
const sheeps = [1, 2];

const sheeps2 = sheeps;

sheeps2.push(3);

console.log(sheeps2);
// [1, 2, 3]

// Ahhh, our original sheeps have changed?!
console.log(sheeps);
// [1, 2, 3]
```

That's why we need to clone an array:

```javascript
const sheeps = [1, 2];

const sheeps2 = [ ...sheeps ];

sheeps2.push(3);

console.log(sheeps2);
// [1, 2] Yay, our original sheeps is not affected!


console.log(sheeps);
// [1, 2, 3]
```

### Mutable vs Immutable Data Types
Mutable:

1. object
2. array
3. function

Immutable:
All primitives are immutable.

1. string
2. number
3. boolean
4. null
5. undefined
6. symbol

### Shallow Copy Only
Please note spread only goes one level deep when copying an array. So if you're trying to copy a multi-dimensional arrays, you will have to use other alternatives.

```javascript
const nums = [
  [1, 2], 
  [10],
];

const cloneNums = [...nums];

// Let's change the first item in the first nested item in our cloned array.
cloneNums[0][0] = '3';

console.log(cloneNums);
// [ [ '3', 2 ], [ 10 ] ]
 
// NOOooo, the original is also affected
console.log(nums);
// [ [ '3', 2 ], [ 10 ] ]
```

Here's an interesting thing I learned. **Shallow copy means the first level is copied, deeper levels are referenced**.

### Array.from

Array.from is Another Way to Clone 

```javascript
const sheeps = [1, 2, 3];

const cloneSheeps = Array.from(sheeps);

console.log(sheeps === cloneSheeps); // false
```

### Object.assign
```javascript
const person = {
  name: 'John',
  age: 28
}

const newPerson = Object.assign({}, person, {
  age: 30
})

console.log(newPerson === person); // false
console.log(person); // { name: 'John', age: 28 }
console.log(newPerson); // { name: 'John', age: 30 }
```

Object.assign is an ES6 feature that takes objects as parameters. It will merge all objects you pass it into the first one. You are probably wondering why the first parameter is an empty object {}. If the first parameter would be ‘person’ we would still mutate person. If it would be { age: 30 }, we’d overwrite 30 with 28 again because that would be coming after. This solution works, we kept person intact, we treated it as immutable!