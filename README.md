# Client-Server Communication

## Objectives

- [ ] Use `fetch` to retrieve data from a server and display the results in the DOM
- [ ] Identify the return value of `fetch` as a Promise object
- [ ] Understand the difference between synchronous and asynchronous code

## Outline

```txt
5 min - Activation - What is a Single Page Application?
15 min - Demonstration - `fetch`
15 min - Check for understanding - `fetch`
5 min - Activation - Asynchronous Code and Promises
10 min - Demonstration - Asynchronous Code and Promises
10 min - Check for understanding - execution order
---
60 min
```

## Activation - What is a Single Page Application? (5 min)

Single Page Apps (SPA) Brainstorm

Brainstorm / Share. Have students brainstorm a list of applications that load or save data asynchronously, without a page refresh. Have students share their examples. Switch to applications that _do not_ load or save data async (ones that do a full page reload on link click or form submit) and repeat.

Applications that fetch data asynchronously:

- Twitter Feed infinite scroll
- Instagram Post 'like' heart

Applications that rerender a whole page (not async):

- Google 'next' search results link
- Amazon shopping cart checkout

Using their examples, show how a user interaction triggers a network request, which in turn triggers an update to the DOM based on the response.

Example:

- Go to twitter.com/coffee_dad
- Open the Network tab in the dev tools
- Scroll to the bottom of the page
- Show the request that is sent out, and the response (JSON)

Drive home this process as the core of SPA architecture:

- When X Event Happens
- Do Y Fetch
- And Update Z on the DOM

It's helpful to frame deliverables in terms of these steps to help students develop a general process to building features in this phase.

## Demonstration - `fetch` (10 minutes)

We're going to build a small application using `json-server` as a backend
to display information about animals.

There's a bit of starter code, so walk through that first (`index.html` and
`index.js`).

The deliverable we're building:

> When the page loads, get a list of animals from our json-server API and
> display them on the page.

- When X Event Happens (page loads)
- Do Y Fetch (`GET /animals`)
- and Update Z On the DOM (display all animals)

The DOM manipulation logic is set up in a separate function, so we can call this
to demonstrate the goal:

```js
// using animalData array from data.js file
animalData.forEach((animal) => {
  renderOneAnimal(animal);
});
```

Let's get things working dynamically by fetching the data instead of using some
hard-coded data that's only stored in our frontend.

First, show that we can make a GET request in the browser by entering the URL:
[https://localhost:3000/animals](https://localhost:3000/animals). You can also
show the same request in Postman to drive home the point about client-server
communication.

To demonstrate how to use `fetch` as a client, I like to refer to the
[MDN Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
page and take their example code, just swapping out the URL with our json-server
endpoint:

```js
fetch("https://localhost:3000/animals")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

Now we can see the same response as we saw in the browser/Postman is available
to us in JavaScript, so we can use the data to update the DOM:

```js
fetch("https://localhost:3000/animals")
  .then((r) => r.json())
  .then((animalData) => {
    animalData.forEach((animal) => {
      renderOneAnimal(animal);
    });
  });
```

But what is it doing? Let's break it down.

```js
fetch("https://localhost:3000/animals");
```

`fetch` is a function that's globally available - we can call it in the browser.
It takes in a url, and sends a GET request to that url. Let's look at the
network tab to see the request happen when we call fetch.

What about `then`?

```js
  .then((response) => response.json())
  .then((animalData) => {
    animalData.forEach((animal) => {
      renderOneAnimal(animal);
    });
  });
```

Well, when we fetch data from the server, it doesn't actually happen right away.
There might be a second or two while the request is "in flight".

`then` is similar to the way we attach an event listener. With event listeners,
we register a callback function to handle the event when it eventually happens.
`then` is similar - it takes in a callback function and runs it when the
response actually comes back from the server.

```js
(response) => response.json();
```

What about this `.json` method?

Well - the response that we get back from the server isn't always going to be
JSON formatted. `fetch` is designed to handle lots of different kinds of HTTP
requests and responses. Since we know that the response from our API is going to
be formatted as JSON, we can call the `.json` method to parse the response. That
effectively turns it from a string into the corresponding javascript object,
with native JS strings, booleans, numbers, arrays, and objects all nested within
it.

You can also show using `.text` on the response instead of `.json` to
demonstrate why this step is needed.

```js
  .then((animalData) => {
    animalData.forEach((animal) => {
      renderOneAnimal(animal);
    });
  });
```

So, at this last step, we are attaching the callback we want to run when we
actually get the data and have parsed it from a response object into a native
javascript object. In this callback, `animalData` will be an array of animals
that we got from the server.

## Check for Understanding - `fetch` (15 minutes)

To give students practice using fetch syntax, give them this [exercise](https://codesandbox.io/s/js-fetch-practice-exercise-ig9u2?file=/README.md).

Solution:

```js
document.querySelector("button").addEventListener("click", () => {
  fetch(API_URL)
    .then((r) => r.json())
    .then((data) => {
      const img = document.querySelector("img");
      img.src = data.image;
    });
});
```

## Activation - Asynchronous Code and Promises (5 minutes)

> There are a few different ways to motivate learning about promises - if you like to talk about 'callback hell' or demonstrate why we like asynchronous code better than sync (blocking) code, this is the moment to do that.

Tracing what happens in what order in synchronous code is relatively easy.

Have students write down: What will get logged in what order?

```js
console.log("A");

function logB() {
  console.log("B");
}

console.log("C");
logB();
```

It will be A, C, B - since the function is run after we log "C".

Tracing what happens in async code is more challenging. Let's try the same exercise with this code:

```js
console.log("A");

fetch(url)
  .then((response) => response.json())
  .then((data) => console.log("B"));

console.log("C");
```

"ACB". Why?

You can also show examples of other async code. This example in particular helps demonstrate the difference between sync/async:

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
```

## Demonstration - Asynchronous Code and Promises (10 minutes)

Let's take a look at the return value of the fetch method.

```js
const x = fetch(url);
x;
//>  Promise {<pending>}
x;
//>  Promise {<resolved>}
```

`x` is a javascript `Promise`. Promises are a container for data that will show up later. They can also tell you about whether the data is there yet.

Promises are a little bit abstract, but you might think of them as

- Online order confirmation email
- An IOU for a slice of cake
- Coffee that you've set to brew

The Promise isn't the thing you want - the item you ordered, the slice of cake, a cup of coffee. Instead, it's something that you can hold onto now, that eventually will get filled in with the real value - or not!

Eventually, a JavaScript Promise - like an online order or an IOU - will get resolved. Usually, that means it will be _fulfilled_ - you get the value you wanted. Sometimes, though, instead getting the value you want, the package goes missing, or your friend fails to give you a slice of cake. We say that these promises are _rejected_.

So, a promise can be in three states:

- `pending`
- `fulfilled`
- `rejected`

We call a promise 'settled' if it's either fulfilled or rejected - it's no longer pending, it's done one or another.

### `then`

Javascript promises have a few more features we can use.

We can add a handler that runs when the response arrives. When we call the `.then` function, it's like adding an event handler. It's code to run later, when the promise is resolved.

Unlike event handlers, `.then` is chain-able. `.then` always returns a promise, so we can attach more `then` handlers that will run in order.

```js
fetch(url)
  .then(() => console.log("resolved"))
  .then(() => console.log("after resolved"))
  .then(() => console.log("after logging after resolved"));
```

Whatever is returned from the last `.then` will be passed as the value in the callback to the next `.then`:

```js
fetch(url)
  .then(() => return "chicken")
  .then((data) => {
    console.log(data)
  })
```

### `catch`

> Working with catch can be treated as bonus content, if students are struggling with the code to this point.

`then` runs when the promise is fulfilled - but what about when it's rejected?

We can use `.catch` to attach a handler for when the promise is rejected.

```js
fetch("https://www.google.com").catch((error) =>
  console.log("Here's the error:", error)
);
```

If the fetch doesn't go through, you can add code to let the user know, or try again.

Helpfully, if there's an error within one of our `then` handlers, `catch` will run!

```js
fetch("https://www.google.com")
  .then((res) => console.log(value))
  .catch((error) => console.log("Here's the error:", error));
// Here's the error: ReferenceError: value is not defined
//    at fetch.then.res
```

## Check for Understanding - Asynchronous Code (10 minutes)

Let's return to some tracing examples.

```js
console.log("A");

fetch(url).then(console.log("B"));

console.log("C");
```

This is a common mistake that students make. Instead of logging "B" later, we are logging B right away. To fix it, we need to pass in a function instead of calling `console.log`.

Let's return to our tracing example from earlier, this time with an additional twist.

```js
console.log("A");

fetch(url)
  .then((res) => {
    console.log("B");
    return res.json();
  })
  .then((data) => {
    console.log("C");
  })
  .catch(() => console.log("D"));

console.log("E");

setTimeout(() => console.log("F"), 200);
```

This one has different answers depending on what happens!

There are two things that could differ:

- promise could be fulfilled or rejected
- promise resolution could be before or after the `setTimeout` callback runs

So, there are four possible scenarios:

- AE BCF
- AE FBC
- AE DF
- AE FD

Note: There could also be an error in the first `then` callback (on parsing the response with `.json`), so there are two more possibilities:

- AE BDF
- AE FBD

Finally, a more realistic example to think on:

```js
function getData(url) {
  console.log("getting data");
  return fetch(url).then((response) => {
    console.log("parsing");
    return response.json();
  });
}

function loadClickHandler() {
  console.log("handling the click of the load button");
  getData().then((data) => {
    console.log("got the data");
    document.querySelector("img").src = data.image;
  });
}

console.log("adding event listener to button");
document
  .querySelector("#load-button")
  .addEventListener("click", loadClickHandler);
```

## Common Misconceptions and Sticking Points

- `fetch` is only for `GET` (only for retrieving data from the server). It's also for sending data to the server! (next lecture)
- `fetch` returns [something other than a promise]. Students struggle with asynchrony and promises,
- Some students struggle with knowing what to do or where to start. A common suggestion is to build out each feature iteratively and think about the features in the context of a user story. For example: “When _some event happens_, I want to make a _what kind of_ fetch call and manipulate the DOM _in what way?_”
  - When the page loads, I want to make a GET `fetch` render a list of books
  - When a user clicks the 'Edit' button, I want to make a PATCH `fetch` and update this DOM element
  - When a user clicks the 'New' button, I want to make a POST `fetch` and render the new dog on the page
  - When a user clicks this 'Delete' button, I want to make a DELETE `fetch` and remove this element from the DOM

With the following code in mind, which is typical of the average student:

```js
fetch(url)
  .then( res => res.json( ) )
  .then(json => …. )
```

- Some students think that `.then` is just a method available, as opposed to a method of Promises.
- They don't explore what the HttpResponse object (`res`) is, and why we invoke the `.json()` method. Its just a pattern-match step.
- They often define the argument of the second callback to `.then()` as `json`, but don't think much regarding it was a JSON string and we parsed it. They call it `json` and know it is a javascript object, but in pattern matching they think they are interacting with JSON, instead of an object derived from the JSON string.
- Regarding requests that require headers: they pattern match the headers without knowing what each of the two are for (i.e. 'Content-Type' & 'Accept')

## Bonus: Async/Await

At this point, students have just been introduced to a lot of new syntax and
concepts. But some students may have already seen `async/await` syntax with
fetch and may be curious, so this may be a good time to introduce them to this
syntax and explain how it works.

Start by refactoring some code that uses Promises to the async/await version:

```js
function getAnimals() {
  fetch("https://localhost:3000/animals")
    .then((response) => response.json())
    .then((data) => console.log(data));
}
```

Anywhere we'd normally use `.then` and a callback function to handle a Promise
resolving, we can use `await` instead:

```js
async function getAnimals() {
  const response = await fetch("https://localhost:3000/animals");
  const data = await response.json();
  console.log(data);
}
```

One common misconception is that returning a value from an async function will
behave like a normal function; make sure students see that async functions
**always return a Promise**:

```js
async function getAnimals() {
  const response = await fetch("https://localhost:3000/animals");
  const data = await response.json();
  return data;
}

console.log(getAnimals());

getAnimals().then((data) => console.log(data));
```

If you want to add some error handling to your async functions, you can use a
`try/catch` block:

```js
async function getAnimals() {
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
}
```

A couple important notes:

- `await` can only be used in `async` functions
  - so `await` can't be used in the global scope
- `async/await` makes your code _look_ more synchronous, but you're still dealing with asynchronous code - so be careful!
