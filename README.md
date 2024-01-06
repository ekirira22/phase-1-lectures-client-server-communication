# Client-Server Communication

## Objectives

- [ ] Use `fetch` to retrieve data from a server and display the results in the DOM
- [ ] Identify the return value of `fetch` as a Promise object
- [ ] Understand the difference between synchronous and asynchronous code

## Outline

- Discuss SPA Architecture
- Use `fetch` to get data from an API and update the DOM
- **Exercise** Practice using `fetch` in this [exercise](https://codesandbox.io/s/js-fetch-practice-exercise-ig9u2?file=/README.md)
- Break down Promise syntax and working with Response
- Discuss synchronous vs asynchronous code

## Single Page Applications

We want to make our User Experience (UX) feel smooth and responsive. Instead of
loading an **entire HTML document** for every request, we'll just make a request
for a small amount of data (JSON) and update the DOM using JavaScript.

Changes will be made with fetch and it will be asynchronous.

For example, like Twitter: when you scroll to the bottom of the page, you see
new tweets! You don't need to go to a whole new page.

Sometimes we have to wait, but we can have indicators to show us that stuff is
happening rather than waiting for the entire page to load.

Building SPA features tends to follow the same set of steps:

- When X Event Happens
- Do Y Fetch
- and Update Z on the DOM

In the Twitter example:

- When (a user scroll) Event Happens
- Do (GET /user/tweets) Fetch
- and Update (the list of tweets) on the DOM

## Using Fetch

Just like we can make a network request in the browser by visiting a URL; or
make a network request in Postman; or make a network request from the terminal
using CURL; we can also make a network request using JavaScript by using `fetch`.

Here's a simple example of using `fetch` to make a network request, using the
syntax from the [MDN Using Fetch][using fetch] article:

```js
fetch("https://localhost:3000/animals")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

In the third line of code, we'll have access to a JavaScript object representing
the **data** sent as a response from the server. Now we can use that data to
update the DOM!

```js
fetch("https://localhost:3000/animals")
  .then((r) => r.json())
  .then((animalData) => {
    animalData.forEach((animal) => {
      renderOneAnimal(animal);
    });
  });
```

![client-server diagram](./client-server.png)

## Fetch Syntax Explained

There's a lot going on in these three lines of code, so let's break it down:

```js
fetch("https://localhost:3000/animals")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

`fetch` is a globally available method in JavaScript. When we call it, we pass
in a URL (we can also pass some additional options, which we'll explore later).
This tells the browser to make a **GET request** to the URL we provided.

### Promises

`fetch` **returns a Promise**, which is a special object in JavaScript that lets
us work with a value that we'll receive **in the future**. Since there's no
telling how long a server will take to respond to our request, we can't work
with the response right away. The **Promise** is the browser's way of letting us
work with that value in the future.

Think of it this way:

> You order some coffee from a coffeeshop. The barista tells you your coffee
> will be ready in a few minutes. You don't have the coffee yet - what you have
> is a **promise** that you'll get some coffee **in the future**.

That's why we couldn't just write out our code like this:

```js
const data = fetch("https://localhost:3000/animals");
console.log(data);
```

### .then

We need some way of handling that data **in the future**, which is what a
Promise is made for. Since `fetch` returns a Promise, we can use the `.then`
method to work with the value we get back in the future, when we get a response
from the server.

```js
const promise = fetch("https://localhost:3000/animals");

promise.then((response) => response.json());
```

`.then` is similar to the way we attach an event listener. With event listeners,
we register a callback function to handle the event when it eventually happens.
`.then` is similar - it takes in a callback function and runs it when the
response actually comes back from the server.

The callback we use in the **first** `.then` method generally looks like this:

```js
(response) => response.json();
```

When we get a response from the server, the browser will call the callback
function we provided, and pass in the **Response** object as the argument.

What about this `.json` method?

Well - the response that we get back from the server isn't always going to be JSON formatted. `fetch` is designed to handle lots of different kinds of HTTP requests and responses. Since we know that the response from our API is going to be formatted as JSON, we can call the `.json` method to parse the response. That effectively turns it from a string into the corresponding javascript object, with native JS strings, booleans, numbers, arrays, and objects all nested within it.

For example, if you were working with a server that sent back text instead of a JSON formatted string, you'd do this instead:

```js
fetch(url)
  .then((response) => response.text())
  .then((text) => console.log(text));
```

### Promise Chain

You'll notice in all the examples that we're calling `.then()` multiple times.

`fetch` returns a Promise, which is why `fetch(url).then(callback)` works.

What do you think `.then()` returns that allows us to call `.then()` again?

That's right - another Promise!

Whatever we return from one `.then` will be passed in as the value to the next:

```js
fetch(url)
  .then((response) => {
    console.log(response);
    return "chicken";
  })
  .then((data) => {
    console.log(data);
    return [1, 2, 3];
  })
  .then((array) => {
    console.log(array);
  });
```

## Asynchronous Code

One of the biggest challenges of working with `fetch` is that it involves
working with code that is **asynchronous** instead of **synchronous**.

Since it will always take a little while for a server to respond to our request:

![client-server diagram](./client-server.png)

We have to find a way to store code that will run **in the future** instead of
running immediately.

We have a pretty good mental model of what's happening when JavaScript is running synchronous code:

```js
console.log("A");

function logB() {
  console.log("B");
}

console.log("C");
logB();
```

Tracing what happens in async code is challenging:

```js
console.log("A");

fetch(url)
  .then((response) => response.json())
  .then((data) => console.log("B"));

console.log("C");
```

Even though we called `fetch()` before `console.log("C")`, the code in our
callback functions won't run until the response is received.

It's similar to registering a callback for an event handler:

```js
console.log("A");

document.querySelector("button").addEventListener("click", () => {
  console.log("B");
});

console.log("C");
```

We won't see `console.log("B")` _until the button is clicked_. Just like in our
`fetch` example, we won't see `console.log("C")` _until the response comes
back_.

The reason this is important is because we can _only access the data once we
have a response from the server_.

For example, this won't work:

```js
let animals;

fetch(url)
  .then((r) => r.json())
  .then((data) => {
    animals = data;
  });

// animals is undefined!
render(animals);
```

But this will:

```js
let animals;

fetch(url)
  .then((r) => r.json())
  .then((data) => {
    animals = data;
    // animals is an array
    render(animals);
  });
```

## Bonus: Async/Await

ES2017 introduced **async functions** and the **await** keyword for writing
asynchronous code with Promises, as an alternative syntax for using `.then`.
Async/await is basically syntactic sugar on top of Promises, but it can make
code that is easier to read and reason about.

Let's take this code for making a fetch request as an example:

```js
function getAnimals() {
  fetch("https://localhost:3000/animals")
    .then((response) => response.json())
    .then((data) => console.log(data));
}
```

We can make this function an `async` function by adding the `async` keyword:

```js
async function getAnimals() {
  fetch("https://localhost:3000/animals")
    .then((response) => response.json())
    .then((data) => console.log(data));
}
```

You can also write it as an arrow function:

```js
const getAnimals = async () => {
  fetch("https://localhost:3000/animals")
    .then((response) => response.json())
    .then((data) => console.log(data));
};
```

Anywhere we'd normally use `.then` and a callback function to handle a Promise
resolving, we can use `await` instead:

```js
const getAnimals = async () => {
  const response = await fetch("https://localhost:3000/animals");
  const data = await response.json();
  console.log(data);
};
```

This syntax can make our code easier to follow, since there's no more `.then`
and no more callbacks to worry about.

One **very important** thing to understand about `async` functions: they will
**ALWAYS** return a Promise:

```js
const getAnimals = async () => {
  const response = await fetch("https://localhost:3000/animals");
  const data = await response.json();
  return data;
};

console.log(getAnimals());

getAnimals().then((data) => console.log(data));
```

If you want to add some error handling to your async functions, you can use a
`try/catch` block:

```js
const getAnimals = async () => {
  try {
    const response = await fetch("https://localhost:3000/animals");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Error in fetch: ${response.statusCode}`);
    }
  } catch (e) {
    console.error(e);
  }
};
```

A couple important notes:

- `await` can only be used in `async` functions
  - so `await` can't be used in the global scope
- `async/await` makes your code _look_ more synchronous, but you're still
  dealing with asynchronous code - so be careful!

## Resources

- [MDN Using Fetch][using fetch]
- [MDN Promises][promises]
- [How JavaScript handles async code][loupe]
- [javascript.info on async/await](https://javascript.info/async-await)
- [MDN on async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)

[using fetch]: (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
[promises]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[loupe]: http://latentflip.com/loupe
