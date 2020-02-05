# Some Notes for Nine Coding Challenge

## File Tree

```
src/
|-- index.ts ------- Main
|-- config.json ---- Deployment options
|
|-- lib/
|    |-- type/ ------ TypeScript Type Definitions
|    |     |-- Request.ts ---- JSON from client
|    |     |-- Response.ts --- HTTP response structure
|    |     |-- Show.ts ------- Parameter for creating class Show
|    |-- all_handler.ts ------ HTTP request handler for rejecting not-allowed methods
|    |-- D9NError.ts --------- Error class for this project
|    |-- D9NResponse.ts ------ HTTP response class
|    |-- error_handler.ts ---- Error handler for invalid JSON
|    |-- post_handler1.ts ---- HTTP POST handler
|    |-- Show.ts ------------- Class for single show
```

## Naming Conventions

* D9N means Demo for 9news

## @leismore/* Packages

* @leismore/all_handler --------- A HTTP request handler which rejects all non-allowed methods
* @leismore/error_handler_last -- A general error handler for Express.js
* @leismore/lmerror ------------- A general error class for Node.js
* @leismore/response ------------ A general HTTP response class

These NPM packages are used to simplify error handling in this project. All NPM packages published under @leismore are written solely by me.

## Solution and Considerations

* One Error class for one project (D9NError in this case)
* The Error class should enclose HTTP response suggestion for error handler
* One file for one class / function and for one simple purpose
* Data structure should be defined explicitly
* Main file should be minimal

1. Define a Error class for this project: D9NError, which is extended from LMError [@leismore/lmerror](https://www.npmjs.com/package/@leismore/lmerror). It carries:

  * Error message for human
  * Error code for program
  * HTTP response tips: status code, HTTP headers and HTTP body
  * Previous error object pointer

  With D9NError, [@leismore/error_handler_last](https://www.npmjs.com/package/@leismore/error_handler_last) becomes smarter. Now it has enough information to decide how to handle these errors.

2. Define input and output data structures. Validate client inputs. Then eventually stores valid data with Show class.
3. Define HTTP 200 (OK) sender (D9NResponse class extended from [@leismore/response](https://www.npmjs.com/package/@leismore/response))
4. Organize everything in `index.ts`

## Conclusion

I understand this is a simple test, which could be done by much less code. But I chose to do it with a harder way to:

1. Showcase my coding style
2. Professional, Readable, Extendable and maintainable

Cheers!
