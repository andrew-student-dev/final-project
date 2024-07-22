import { useState } from "react";
import {useAccount, useWalletClient} from "wagmi";
import {ethers} from "ethers";
import { usePriceIsRightContract } from "./usePriceIsRightContract";

export function StartGame() {
  const [itemName, setItemName] = useState("");
  const [actualPrice, setActualPrice] = useState(0);
  const [secret, setSecret] = useState("");
  const [endTime, setEndTime] = useState(0);
  const [feedback, setFeedback] = useState("");

  const {address} = useAccount();
  const {data: walletClient} = useWalletClient();

  const {contract, provider, priceIsRightAddress} = usePriceIsRightContract();

  const sendTransaction = async () => {
    //@ts-ignore
  const nonce = await provider.getTransactionCount(address)
    if(!walletClient || !address || !contract) return;
    const hash = ethers.solidityPackedKeccak256(["string", "uint256", "string"], [itemName, actualPrice, secret])
    // const currentBlockNumber = await provider.getBlockNumber();
    const currentBlock = await provider.getBlock("latest");
    const blockTime = currentBlock?.timestamp;
    //@ts-ignore
    const gameEndTime = blockTime + endTime;
    const data = contract.interface.encodeFunctionData("setGameState", [itemName, hash, gameEndTime])
    const tx = {
      nonce: nonce,
      from: address,
      to: priceIsRightAddress,
      data: data,
    }

    try {
      //@ts-ignore
      const txResponse = await walletClient.sendTransaction(tx);
      setFeedback("Contestants, come on down!")
    } catch(error) {
      setFeedback("Something went wrong")
      console.error(error);
    }
  }

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
      <div>
        <button className="btn bg-secondary" onClick={sendTransaction} > Submit Data </button>
      </div>
      {feedback && 
        <div>
          <p>{feedback}</p>
        </div>
      }
      </div>
      </div>
    </>
  )
}