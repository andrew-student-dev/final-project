import {useEffect, useState} from "react";
import {useAccount, useWalletClient} from "wagmi";
import {ethers, JsonRpcProvider} from "ethers";
import * as priceIsRightJson from "../../../hardhat/artifacts/contracts/PriceIsRight.sol/PriceIsRight.json";

const priceIsRightABI = priceIsRightJson.abi;
const priceIsRightAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const provider = new JsonRpcProvider("http://127.0.0.1:8545");


export function usePriceIsRightContract() {
  const [contract, setContract] = useState<ethers.Contract>();
  const {address} = useAccount();
  const {data: walletClient} = useWalletClient();

  useEffect(() => {
    const priceIsRightContract = new ethers.Contract(priceIsRightAddress, priceIsRightABI, provider);
    setContract(priceIsRightContract);
  }, []);

  return {contract, address, walletClient, provider, priceIsRightAddress}
}
