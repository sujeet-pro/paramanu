# Paramanu Utils

This contains set of utility funcitons

## Object

### deepFreeze

`Object.freeze` freezes the object at a single level, `deepFreeze` does this recursivily for all the inner objects as well.

```ts
const testObj = {
  name: 'sujeet'
  work: {
    role: 'Software Engineer',
    level: 'Lead'
  }
}

const frozen = deepFreeze(testObj)
```
