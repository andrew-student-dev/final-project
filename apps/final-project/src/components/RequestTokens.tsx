import { useAccount } from "wagmi";
import { useState } from "react";

export function RequestTokens() {
  const account = useAccount();
  const [feedback, setFeedback] = useState("")
  const [data, setData] = useState("");
  
  const handleSubmit: any = () => {
    fetch("http://localhost:3000/api/request-tokens", {
    method: 'POST',
    headers: {
      'Content-type' : 'application/json'
    },
    body : JSON.stringify({
      address: account.address
    })
  })
  .then((res) => {
    if(!res.ok) {
      setFeedback("error")
      throw new Error("unable to complete request")
    }

    return res.json();
  })
  .then((d) => {
    console.log(d);
    setFeedback("Thank you for purchasing Price is Right Tokens!");
  })
}

  return (
    <div>
      <button className="btn bg-secondary" onClick={handleSubmit}>Request Tokens</button>
      {feedback && <p>{feedback}</p>}
    </div>
  )
}