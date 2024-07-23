import { useState } from "react";
import { usePriceIsRightContract } from "./usePriceIsRightContract";


export function ComeOnDown() {
  const [feedback, setFeedback] = useState("");
  const {contract, provider, walletClient, address, priceIsRightAddress} = usePriceIsRightContract();

  const getData = async () => {
    if(!address || !contract) return;
    const nonce = await provider.getTransactionCount(address);
    const data = contract.interface.encodeFunctionData("comeOnDown")
    const tx = {
      nonce: nonce,
      from: address,
      to: priceIsRightAddress,
      data: data
    }

    try {
      //@ts-ignore
      const txResponse = await walletClient?.sendTransaction(tx);
      setFeedback("We have our contestants!")
    } catch(error) {
      console.error(error);
    }
  }

  return(
    <>
      <div>
          <button onClick={getData} className="btn bg-secondary">Get Contestants</button>
          {feedback && <p>{feedback}</p>}
      </div>
    </>
  )

}