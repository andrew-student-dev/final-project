import {useAccount, useWalletClient, useSendTransaction} from "wagmi";
import {ethers, Wallet, JsonRpcProvider} from "ethers";
import { useEffect, useState } from "react";
import * as priceIsRightJson from "../../../hardhat/artifacts/contracts/PriceIsRight.sol/PriceIsRight.json"
import * as tokenJson from "../../../hardhat/artifacts/contracts/Token.sol/Token.json";

export function EnterContest() {

  const [userBet, setUserBet] = useState(0);
  const[itemName, setItemName] = useState("");
  const [feedback, setFeedback] = useState("");

  const priceIsRightABI = priceIsRightJson.abi;
  const priceIsRightAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const provider = new JsonRpcProvider("http://127.0.0.1:8545");
  const contract = new ethers.Contract(priceIsRightAddress, priceIsRightABI, provider);

  const tokenABI = tokenJson.abi
  const tokenAddress = "0xB7A5bd0345EF1Cc5E66bf61BdeC17D2461fBd968";
  const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
  


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

  const approveTokens = async () => {
    if(!walletClient || !address) return;
    const ammountToApprove = ethers.parseEther("10");
    const data = tokenContract.interface.encodeFunctionData("approve", [priceIsRightAddress, ammountToApprove]);

    const tx = {
      from: address,
      to: tokenAddress,
      data: data
    }

    try {
      //@ts-ignore
      const txResponse = await walletClient.sendTransaction(tx);
      setFeedback("Tokens approved!")
      enterContest()
    } catch(error) {
      setFeedback("Something went wrong")
      console.error(error);
    }

  }

  const enterContest = async () => {
    //@ts-ignore
    const nonce = await provider.getTransactionCount(address)
    if(!walletClient || !address) return;
    const data = contract.interface.encodeFunctionData("enterContest", [userBet]);
    const tx = {
      nonce: nonce,
      from: address,
      to: priceIsRightAddress,
      data: data,
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
          <button onClick={approveTokens} className="btn bg-secondary justify-center">Submit</button>
        </div>
        {feedback && <p>{feedback}</p>}
      </div>
    </div>
  </>
  )

}
