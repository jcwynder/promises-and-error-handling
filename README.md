# Promises and Error Handling

- [Promises and Error Handling](#promises-and-error-handling)
  - [Overview](#overview)
  - [Reflection](#reflection)

## Overview

For this simple lab project, I was tasked with building a small application that leverages asynchronous API calls using Promises. Error handling was implemented to ensure that the application can manage unexpected issues gracefully. This lab was used to test my ability to work with asynchronous programming concepts, as well as to manage errors effectively in a real-world scenario.

**Objectives:**

- Apply Promises to manage multiple asynchronous operations in JavaScript.
- Implement chained Promises to handle sequential data retrieval and manage dependencies between API calls.
- Utilize `.catch()` and `.finally()` to handle errors and perform cleanup tasks in a Promise chain.
- Design custom error classes to improve error identification and debugging.
- Implement a retry mechanism to manage failed asynchronous requests, enhancing application resilience.
- Analyze the benefits and challenges of using error handling strategies in complex asynchronous workflows.

## Reflection

This assignment was designed to showcase what we learned from the new section of Typescript we covered. This assignment was not desgned to show anything on display for the frontend. All output details are only shown on the console once the project is siumlated.

Throughout this assignment, I was forced to rework my code several times in order to properly implement a showcase for the assignment's objectives. It spent several days researching and studying aspects from this lesson and other aspects covered in the Typescript lesson we learned.

**Critcal Thinking Questions:**

1. Why is it important to handle errors for each individual API call rather than just at the end of the promise chain?

   - It is important to handle errors for each individual API call rather than just at the end of the promise chain to maintain application reliability and provide a better user experience. By handling errors at the point of failure, you can prevent the chain from terminating prematurely and allow for more robust recovery mechanisms.

2. How does using custom error classes improve debugging and error identification?

   - Using custom error classes improve debugging and error identification by providing more specific information about errors, making it easier to pinpoint the source and understand the nature of the problem. This is achieved by allowing developers to define specific error types that are more informative than generic errors.

3. When might a retry mechanism be more effective than an immediate failure response?

   - A retry mechanism is generally more effective than an immediate failure response in situations involving transient failures, where the problem is expected to be temporary and resolve itself relatively quickly.
