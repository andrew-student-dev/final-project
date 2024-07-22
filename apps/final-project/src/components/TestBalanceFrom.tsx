import { usePriceIsRightContract } from "./usePriceIsRightContract";
import {ethers} from "ethers";

export function TestBalanceFrom() {
  const {address, contract} = usePriceIsRightContract();

  const getBalance = async () => {
    if(!contract) return;
    const balance = await contract.testBalanceFromAddress(address);
    const balanceParsed = ethers.formatEther(balance.toString());
    console.log(balanceParsed);
  }

  return(
    <div>
      <button onClick={getBalance} className="btn bg-secondary">Get Balance of Connected Address</button>
    </div>
  )
}