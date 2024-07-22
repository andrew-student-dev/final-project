import * as priceIsRightJson from "../../../hardhat/artifacts/contracts/PriceIsRight.sol/PriceIsRight.json"
import { JsonRpcProvider } from "ethers";
import {ethers} from "ethers";
import { useAccount, useWalletClient } from "wagmi";


export function AwardGoldenTicket() {
  const priceIsRightABI = priceIsRightJson.abi;
  const priceIsRightAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const provider = new JsonRpcProvider("http://127.0.0.1:8545");
  const contract = new ethers.Contract(priceIsRightAddress, priceIsRightABI, provider);

  const {address} = useAccount();
  const {data: walletClient} = useWalletClient();

  const handleSubmit = async () => {
    if(!walletClient || !address) return;
    const nonce = await provider.getTransactionCount(address)
    const data = contract.interface.encodeFunctionData("awardGoldenTicket", [address])
    const tx = {
      nonce: nonce,
      from: address,
      to: priceIsRightAddress,
      data: data
    }
    //@ts-ignore
    const txResponse = await walletClient.sendTransaction(tx)
    console.log(txResponse)
  }

  return (
    <>
      <div>
        <button className="btn bg-secondary" onClick={handleSubmit}>GoldenTicket</button>
      </div>
    </>
  )


}