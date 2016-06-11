# React + Redux product filter app

This is a simple web app built with [React](https://facebook.github.io/react/) and [Redux](https://github.com/reactjs/redux) that filters a list of potentially dynamic products (right now they are hardcoded, but delivered to the app asynchronously via Promises) and product properties via a set of operators. The app is built for maximum extensibility -- I wanted to create something that I could use as a blueprint for future app construction. I'd say took ~10 hours to create (including putting together the boilerplate)

## Useful commands

 - `npm run dev` runs the `webpack-dev-server` with hot reloading. Very nice for development!
 - `npm run test` will run all of the various tests via Mocha.
 - `npm run build` builds the app for production. You can find the resulting files in `dist/`.

### Assumptions & Process

For this project, I assumed that this app would eventually needed to be built upon, so I aimed for a comprehensive solution that hopefully wouldn't experience too painful growing pains. I tackled the project by first laying down a solid foundation with React and Redux. Then, I created a barebones UI and wrote the product and filter reducers and associated action creators. Next came the Main container, and the various components. I assumed that the products and properties would eventually needed to be loaded over HTTP, so they are passed into the app via Promises for async simulation.

### Points of interest

Most of the app's logic is in the product module: `src/modules/product/product.js`. Each module houses the action creators, reducers, and action constants for various sections of the app. For instance, this app has a filter module, for controlling the selection of various filtering options, and a product module, for keeping track of the products and their associated properties. The unit tests for the product module can be found in the same directory, under `product.spec.js`.

Also of note is the Main container located at `src/containers/Main/Main.js`. As a side note, I'm not thrilled with the repetition in the naming conventions, but it's a lot easier to see what file you're working on in your editor when they aren't all named `index.js`. The directory structure also allows for the bundling of related files, e.g. Sass and testing files. The Main container is where we connect the state from our store to the app's components. In a multi-route SPA you would load this container via a router of some sort, but here we are just dropping it into our entry point file `src/index.js` because the app only has one view.

`src/index.js` is where we attach the app to the DOM in `dist/index.html`. We also combine the various reducers here, apply the necessary middleware, and finally compose the app's data store.

`src/services/data.js` is a mock data fetching service -- if this were deployed in the real world, we would most likely want to grab the products and properties from an API of some sort via HTTP requests. The data loading functions return Promises to simulate how a network call would work here.

The CSS (Sass) for this project is fairly straight-forward. One cool thing to note though is that the `.scss` files are loaded directly into the components. `src/containers/Main`, `src/components/Product`, `src/components/ProductList` and `src/components/FilterControl` all have their own Sass stylesheet, and there are app-wide styles located at `src/style`.

### Things to work on

Obviously the app could be a bit prettier. Like I mentioned above, interfacing with a RESTful API would no doubt add lots of functionality to this. Adding more test coverage is almost always desirable -- I would start with covering the components, the entire surface area of the product module, and then also the filter module. A more substantially tuned webpack config for the production build would also be welcome.