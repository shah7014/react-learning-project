import React from "react";

const Child1  =() => {
    return <p>Child 1</p>
}
const Child2  =() => {
    return <p>Child 2</p>
}

const Parent  = ({children}: {children: React.ReactNode}) => {
    return <div>
        <h3>This is parent component</h3>
        {children}
    </div>
}

const ParentChild  =() => {
    return <Parent>
        <Child1 />
        <Child2 />
    </Parent>
}

export default ParentChild;

