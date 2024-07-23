import { useAccount, useWalletClient } from "wagmi";
import { useState } from "react";
import {ethers, parseEther} from "ethers";
import { usePriceIsRightContract } from "./usePriceIsRightContract";

export function RequestTokens() {
  const {address} = useAccount();
  const {data: walletClient} = useWalletClient();
  const {contract, provider, priceIsRightAddress} = usePriceIsRightContract();

  const [feedback, setFeedback] = useState("")


  

  const sendTransaction = async () => {
    //@ts-ignore
    const nonce = await provider.getTransactionCount(address)
    if(!walletClient || !address || !contract) return;

    const data = contract.interface.encodeFunctionData("mintTokens", [address, parseEther("100")])
    const tx = {
      nonce: nonce,
      from: "address",
      to: priceIsRightAddress,
      data: data
    }

    try {
      //@ts-ignore
      const txResponse = await walletClient.sendTransaction(tx);
      setFeedback("Thank you for purchasing Price is Right tokens!")
    } catch(error) {
      setFeedback("Something went wrong")
      console.error(error)
    }
  }

  return (
    <div>
      <button className="btn bg-secondary" onClick={sendTransaction}>Request Tokens</button>
      {feedback && <p>{feedback}</p>}
    </div>
  )
}