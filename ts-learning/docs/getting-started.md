### Basics

#### union
- let a: string[] => array of type string
- let b: string [] | number[] => an array **entirely** of either number or string
- let c: (string | number)[] => an array that could **contain both number or string**

#### functions

-
```ts
    const convertToUpperCase = (data: string): string => data.toUpperCase()

    function convertToLowerCase(data: string): string {
        return data.toLowerCase();
    }
```

- optional params can be marked with **?**
```ts
    const sum = (num1: number, num2: number, num3?: number) => {
    return num3 ? num1 + num2 + num3 : num1 + num2;
    }
```

#### types

```ts
    type UserType = {
    firstName: string,
    lastName: string,
    isInWwe: boolean,
    country?: string,
    isFamous: "Yes" | "No"
    }
```

### interface and generics

- for interface we prefix its name with **I**. so it would be something like **IUser**

```ts

interface IUser {
    firstName: string;
    lastName: string;
    phone?: string;
    age?: number;
}

interface IPost<T> {
    id: number;
    title: string;
    description: string;
    extra: T[]
}

const post: IPosst<IUser> = {
    id: 1,
    title: "title",
    description: "desc",
    extra: [{firstname: "mike", lastName: "ty"}]
}
```


