import React from 'react'

function CompenentExample1() {
    // Not HTML its JSX?
    // Need to use "className" NOT "class" for JSX - class is reserved for JS.
    return(
      <div>
        <h1 className="section-title section-title--blue">This is my React Example Component</h1>
        <p>React is apparently great, I think I want to learn more about it!</p>
        <p>By the way, Richmond Tigers won the AFL premiership in 2019 and 2020!</p>
      </div>
    )
}

export default CompenentExample1