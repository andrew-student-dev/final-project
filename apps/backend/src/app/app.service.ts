import { Injectable, OnModuleInit } from '@nestjs/common';
import { JsonRpcProvider, ethers } from 'ethers';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AppService implements OnModuleInit {
  private provider: ethers.JsonRpcProvider;
  private signer: ethers.Wallet;
  private contract: ethers.Contract;
  private contractWithSigner: ethers.Contract;

  private readonly contractAddress = process.env.HELLO_WORLD_CONTRACT_ADDRESS;
  private readonly contractABI = [
    'function helloWorld() public view returns (string memory)',
    'function setText(string memory newText) public',
  ];

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
  }

  async getHelloWorld(): Promise<string> {
    return await this.contract.helloWorld();
  }

  async setHelloWorld(text: string) {
    const tx = await this.contractWithSigner.setText(text)
    return await tx.wait()
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
