import { Injectable, OnModuleInit } from '@nestjs/common';
import { JsonRpcProvider, ethers, parseUnits } from 'ethers';
import viem from "viem";

import * as dotenv from 'dotenv';
import * as priceIsRightJSON from "../../../hardhat/artifacts/contracts/PriceIsRight.sol/PriceIsRight.json"
import * as faucetJSON from "../../../hardhat/artifacts/contracts/Faucet.sol/Faucet.json"
import * as tokenJSON from "../../../hardhat/artifacts/contracts/Token.sol/Token.json";
// import { hardhat } from 'wagmi/chains';
import {hardhat} from "viem/chains"
import {createWalletClient, http} from "viem";
dotenv.config();

@Injectable()
export class AppService implements OnModuleInit {
  private provider: ethers.JsonRpcProvider;
  private signer: ethers.Wallet;
  private contract: ethers.Contract;
  private token: ethers.Contract;
  private faucet: ethers.Contract;
  private contractWithSigner: ethers.Contract;
  private walletClient: viem.WalletClient;

  // private readonly contractAddress = process.env.HELLO_WORLD_CONTRACT_ADDRESS;
  // private readonly contractABI = [
  //   'function helloWorld() public view returns (string memory)',
  //   'function setText(string memory newText) public',
  // ];

  private readonly contractAddress = process.env.PRICE_IS_RIGHT_CONTRACT_ADDRESS;
  private readonly contractABI = priceIsRightJSON.abi;

  

  async onModuleInit() {
    const alchemyUrl = process.env.RPC_ENDPOINT_URL;
    console.log('foo', this.contractAddress);
    this.provider = new JsonRpcProvider("http://127.0.0.1:8545")
    
    this.signer = new ethers.Wallet(process.env.HH_PRIVATE_KEY, this.provider)
    this.contract = new ethers.Contract(
      this.contractAddress,
      this.contractABI,
      this.provider
    );

    // use this.ContractWithSigner when writing to contract
    this.contractWithSigner = new ethers.Contract(
      this.contractAddress,
      this.contractABI,
      this.signer
    )

    this.faucet = new ethers.Contract(
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      faucetJSON.abi,
      this.signer 
    )

    const tokenAddress: string = await this.contract.token();

    this.token = new ethers.Contract(
      tokenAddress,
      tokenJSON.abi,
      this.signer
    )

    

    this.walletClient = createWalletClient({
      account: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      chain: hardhat,
      transport: http("http://127.0.0.1:8545")
    })
  }

  // async getHelloWorld(): Promise<string> {
  //   return await this.contract.helloWorld();
  // }

  // async setHelloWorld(text: string) {
  //   const tx = await this.contractWithSigner.setText(text)
  //   return await tx.wait()
  // }

  async getAddress() {
    return await this.contract.goldenTicket();
  }

  async requestFaucetTokens(address: `0x${string}`) {
    const amount = ethers.parseUnits("100");
    const tx = await this.token.mint(address, amount);
    await tx.wait();
    // const txSigner = await this.provider.getSigner(address);
    // const contractWithTxSigner = this.faucet.connect(txSigner);
    // // @ts-ignore
    // const tx = await contractWithTxSigner.requestTokens();
    // await tx.wait();
    return { success: true, message: 'Tokens requested successfully' };
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async startGame(itemName: string, actualPrice: number, secret: string, endTime: number) {
    const currentBlockNumber = await this.provider.getBlockNumber();
    const currentBlock = await this.provider.getBlock(currentBlockNumber);
    const blockTimestamp = currentBlock.timestamp
    
    
    // hash to be saved on blockchain
    const hash = ethers.solidityPackedKeccak256(["string", "uint256", "string"], [itemName, actualPrice, secret])

    const gameEndTime = blockTimestamp + endTime;

    const tx = await this.contractWithSigner.setGameState(itemName, hash, gameEndTime);

    await tx.wait();

    const txReceipt = this.provider.getTransactionReceipt(tx);
  }

  async getGameIsOpen() {
    const tx = await this.contract.gameOpen();
    return tx;
  }

  async closeGame(itemName: string, actualPrice: number, secret: string) {
    return await this.contractWithSigner.closeGame(itemName, actualPrice, secret);
  }

  async enterContest() {
    
  }

  async enterContestOLD(bet: number, address: `0x${string}`, client: any) {
    const wallet = new ethers.Wallet(client, this.provider);
    const contractWithWallet = new ethers.Contract(this.contractAddress, this.contractABI, wallet)
    const tx = {
      to: this.contractAddress,
      data: contractWithWallet.interface.encodeFunctionData("enterContest", [bet])
    }
    console.log("client:", client)
    const txResponse = await wallet.sendTransaction(tx);

    // const txHash = await this.walletClient.writeContract({
    //   //@ts-ignore
    //   address: contractAddress,
    //   abi: this.contractABI,
    //   functionName: "enterContest",
    //   args: [bet],
    //   from: address
    // })
    
  }

  // vanity idea that didn't pan out
  async fundFaucet() {
    const faucetAddress = this.faucet.getAddress();
    const fundAmount = ethers.parseUnits('500', 18);
    try{
    const transferTx = await this.token.transfer(faucetAddress, fundAmount);
    await transferTx.wait();
    } catch(error) {
      console.error(error.message)
    }
    console.log("Faucet funded")
  }

}

