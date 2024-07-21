import {useAccount, useWalletClient, useSendTransaction} from "wagmi";
import {ethers, Wallet, JsonRpcProvider} from "ethers";
import { useEffect, useState } from "react";
import * as priceIsRightJson from "../../../hardhat/artifacts/contracts/PriceIsRight.sol/PriceIsRight.json"

export function EnterContest() {

  const [userBet, setUserBet] = useState(0);
  const[itemName, setItemName] = useState("");
  const [feedback, setFeedback] = useState("");

  const priceIsRightABI = priceIsRightJson.abi;
  const priceIsRightAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const provider = new JsonRpcProvider("http://127.0.0.1:8545");
  const contract = new ethers.Contract(priceIsRightAddress, priceIsRightABI, provider);

  const {address} = useAccount();
  const {data: walletClient} = useWalletClient();

  useEffect(() => {
    const fetchItemName = async () => {
      try {
        const _itemName = await contract.itemName();
        setItemName(_itemName);
      } catch (error) {
        setFeedback("Unable to get item name")
      }
    };

    fetchItemName();
  }, [])

  const sendTransaction = async () => {
    if(!walletClient || !address) return;
    const testBet = 800;
    const data = contract.interface.encodeFunctionData("enterContest", [testBet]);
    const tx = {
      from: address,
      to: priceIsRightAddress,
      data: data,
      value: ethers.parseEther("0.0001"),
    }

    try {
      //@ts-ignore
      const txResponse = await walletClient.sendTransaction(tx);
      setFeedback("You've entered the contest, good luck!")
      console.log("Response:", txResponse)
    } catch (error) {
      setFeedback("Something went wrong, please try again later")
      console.error(error)
    }


  }

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
            <span> {itemName}</span>
          </label>
        </div>
        <div>
          <label><span>Guess how much </span>
            <input
              type="number"
              value={userBet}
              onChange={(e) => setUserBet(e.target.valueAsNumber)}
               />
          </label>
        </div>
        <div className="flex items-center">
          <button onClick={sendTransaction} className="btn bg-secondary justify-center">Submit</button>
        </div>
        {feedback && <p>{feedback}</p>}
      </div>
    </div>
  </>
  )

}
