import { useState } from "react";
import { usePriceIsRightContract } from "./usePriceIsRightContract";

export function CloseGame() {
  const [itemName, setItemName] = useState("");
  const [actualPrice, setActualPrice] = useState(0);
  const [secret, setSecret] = useState("");
  const [feedback, setFeedback] = useState("");

  const {contract, priceIsRightAddress, provider, address, walletClient} = usePriceIsRightContract();

  const handleSubmit = async () => {
    //@ts-ignore
    const nonce = await provider.getTransactionCount(address);
    if(!contract) return;
    const data = contract.interface.encodeFunctionData("closeGame", [itemName, actualPrice, secret])
    const tx = {
      nonce: nonce,
      from: address,
      to: priceIsRightAddress,
      data: data 
    }

    try {
      //@ts-ignore
      const response = await walletClient.sendTransaction(tx);
      console.log(response);
      setFeedback("We have a winner!")
    } catch(error) {
      setFeedback("Something went wrong")
      console.error(error);
    }

  }

  const handleSubmit2 = () => {
    fetch("http://localhost:3000/api/close-game", {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify({
        itemName: itemName,
        actualPrice: actualPrice,
        secret: secret
      })
    })
    .then((res) => {
      if(!res.ok) {
        setFeedback("Something went wrong")
        throw new Error("Unable to post request")
      }

      return res.json();
    })
    .then((data) => {
      console.log(data.result)
      setFeedback("Game has been closed")
    })
  }

  return(
    <>
      <div className="card w-96 bg-primary text-primary-content mt-4">
        <div className="card-title justify-center">
          <label>Close Game</label>
        </div>
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
                Secret
                  <input 
                  type="text" 
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                />
              </label>
            </div>
            <button onClick={handleSubmit} className="btn bg-secondary" >Submit</button>
            {feedback && <p>{feedback}</p>}
          </div>
      </div>
    </>
  )

}