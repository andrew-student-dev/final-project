import { useEffect, useState } from "react";
import { useAccount, useWalletClient, useSignMessage, useSendTransaction } from "wagmi";

export function EnterContestOld() {
  const [bet, setBet] = useState(0);
  const [itemName, setItemName] = useState("");
  const account = useAccount();
  const signer = useSignMessage();
  const[feedback, setFeedback] = useState("")
  const client = useWalletClient({account: account.address})
  console.log(client)
  const getItemData = () => {
    fetch("http://localhost:3000/api/get-item-data")
    .then((res) => {
      if(!res.ok) {
        setFeedback("Something went wront, please try again later.")
      }

      return res.json();
    })
    .then((data) => {
      setItemName(data.result);
    })
  }


  const handleSubmit = async () => {
    fetch("http://localhost:3000/api/enter-contest", {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({
        guess: bet,
        address: account.address,
        client: client
      })
    })
    .then((res) => {
      if(!res.ok) {
        setFeedback("Sorry, something went wrong. Please try again later")
      }

      return res.json();
    })
    .then((data) => {
      setFeedback("Good luck!")
      console.log(data);
    })
    
  }


  useEffect(() => {
    getItemData()
  }, []) 

  return (
    <>
      <div className="card w-96 bg-primary text-primary-content mt-4">
        <div className="card-body">
          <div className="card-title justify-center">
              <label>Enter the Contest!</label>
          </div>
          <div>
            <label>
              Item Name:
              <p>{itemName}</p>
            </label>
          </div>
          <div>
            <label>Guess how much
              <input
                type="number"
                value={bet}
                onChange={(e) => setBet(e.target.valueAsNumber)}
                 />
            </label>
          </div>
          <div>
            <button onClick={handleSubmit} className="btn bg-secondary">Submit</button>
          </div>
          {feedback && <p>{feedback}</p>}
        </div>
      </div>
    </>
  )
  
}