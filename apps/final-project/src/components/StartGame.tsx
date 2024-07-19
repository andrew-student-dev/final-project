import { useState } from "react";
import {useAccount} from "wagmi";

export function StartGame() {
  const [itemName, setItemName] = useState("");
  const [actualPrice, setActualPrice] = useState(0);
  const [secret, setSecret] = useState("");
  const [endTime, setEndTime] = useState(0);
  const [feedback, setFeedback] = useState("");

  

  const handleSubmit = () => {
    fetch("http://localhost:3000/api/start-game", {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(
        {
          itemName : itemName,
          actualPrice : actualPrice,
          secret : secret,
          endTime : endTime
        }
      )
    }).then((res) => {
      if(!res.ok) {
        setFeedback("Well shoot")
        throw new Error("cannot post request");
      } 

      return res.json();
    }).then((data) => {
      setFeedback("Contestants, come on down!")
    })
  }


  return (
    <>
    <div className="card w-96 bg-primary text-primary-content mt-4">
      <div className="card-body">
      <div>
        <label>
          Item Name
          <input 
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          Actual Price
          <input 
            type="number"
            value={actualPrice}
            onChange={(e) => setActualPrice(e.target.valueAsNumber)} 
          />
        </label>
      </div>
      <div>
        <label>
          Secret Password
          <input 
            type="text"
            value={secret}
            onChange={(e) => setSecret(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          Game End Time (in seconds)
          <input 
            type="number"
            value={endTime}
            onChange={(e) => setEndTime(e.target.valueAsNumber)} 
          />
        </label>
      </div>
      <div className="btn bg-secondary">
        <button onClick={handleSubmit} > Submit Data </button>
      </div>
      {feedback && 
        <div>
          <p>Contestants, come on down!</p>
        </div>
      }
      </div>
      </div>
    </>
  )
}