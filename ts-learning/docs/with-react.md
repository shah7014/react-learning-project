### React with ts

#### props
```tsx

type Post = {
    id: number,
    title: string,
    body: string
}

const SinglePost = ({title, body}: Post) => {
    return <div>
        <h3>{title}</h3>
        <p>{body}</p>
    </div>
}

```

#### children prop type
