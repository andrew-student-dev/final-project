import {JsonRpcProvider, ethers} from "ethers";
import * as nftJson from "../../../hardhat/artifacts/contracts/GoldenTicket.sol/GoldenTicket.json"

export function TestNftData() {
  const nftAbi = nftJson.abi;
  const nftAddress = "0xa16E02E87b7454126E5E10d957A927A7F5B5d2be";
  const provider = new JsonRpcProvider("http://127.0.0.1:8545");

  const nftContract = new ethers.Contract(nftAddress, nftAbi, provider);

  const getData = async () => {
    const response = await nftContract.tokenURI(0);
    console.log(response);
  }

  return(
    <div>
      <button onClick={getData} className="btn bg-secondary">Get NFT Data</button>
    </div>
  )

}