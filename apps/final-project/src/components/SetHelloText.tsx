import { useState } from "react"


export const SetHelloText = () => {
  const [helloText, setHelloText] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    fetch("http://localhost:3000/api/set-hello-world", {
      method : 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(
        {text : helloText}
      )
    })
    .then((res) => {
      if(!res.ok) {
        throw new Error("cannot post request")
      }

      return res.json();
    })
    .then((data) => {
      setFeedback("Hello World text has been changed")
      setHelloText("")
    })
  }

  return(
    <div>
      <label>
        Set HelloWorld Text:
      <input 
        type="text"
        value={helloText}
        onChange={(e) => setHelloText(e.target.value)}
       />
       </label>
       <br></br>
       <button onClick={handleSubmit}>Submit</button>
       {feedback && <p>{feedback}</p>}
    </div>
  )
}