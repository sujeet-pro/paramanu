# Paramanu's Wait

This is a set of utility methods, that you could use to wait on something.

## Function

### Timer Based

#### Wait

Wait for the given delay (time in ms)

```ts
await wait(1000)
```

#### WaitForever

A promise that never resolves. This is mostly for testing.

```ts
await waitForever()
```

### Polling Based

#### waitForPolledCondition

This is an async function that allows developers to provide
a condition function, polling interval (in milliseconds), and optional timeout (in milliseconds).

```ts
await waitForPolledCondition(() => document.body.classList.has("loaded"), { pollInterval: 100, timeout: 30000 })
```

### Event Based

#### waitForPageLoad

Wait for page load

```ts
await waitForPageLoad()
```

Wait for page load, or timeout whichever is first.
Example use case - execute somthing on page load, but don't wait for  more than 1000 sec.

```ts
await waitForPageLoad(1000)
```
