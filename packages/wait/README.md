# Paramanu's Wait

This is a set of utility methods, that you could use to wait on something.

## Wait

Wait for the given delay (time in ms)

```ts
await wait(1000)
```

## waitForPolledCondition

This is an async function that allows developers to provide 
a condition function, polling interval (in milliseconds), and optional timeout (in milliseconds).

```ts
 await waitForPolledCondition(
    () => document.body.classList.has('loaded'),
    {pollInterval: 100, timeout: 30000}
 );
```
