import { usePriceIsRightContract } from "./usePriceIsRightContract"


export function TestBalanceOf() {
  const {address, walletClient, contract} = usePriceIsRightContract();

  const getBalance = async () => {
    if(!contract) return;
    const balance = await contract.testBalance()  
    console.log(balance)
  }

  return(
    <div>
      <button onClick={getBalance} className="btn bg-secondary">Get Contract Balance</button>
    </div>
  )
}