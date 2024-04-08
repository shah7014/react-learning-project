- when we have an object with key-value we can define it as:-

**option:1**
```ts
const a: {[key: string]: number | string} = {
    name: "sample",
    age: 30
}
```
**option:2**
```ts
const a: Record<string, number | string> = {
    name: "sample",
    age: 30
}
```
