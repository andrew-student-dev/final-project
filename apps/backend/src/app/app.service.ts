import { Injectable, OnModuleInit } from '@nestjs/common';
import { JsonRpcProvider, ethers } from 'ethers';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AppService implements OnModuleInit {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;

  private readonly contractAddress = process.env.HELLO_WORLD_CONTRACT_ADDRESS;
  private readonly contractABI = [
    'function helloWorld() public view returns (string memory)',
    'function setText(string memory newText) public',
  ];

  async onModuleInit() {
    console.log('foo', this.contractAddress);
    this.provider = new JsonRpcProvider('http://127.0.0.1:8545/', undefined, {
      staticNetwork: true,
    });
    this.contract = new ethers.Contract(
      this.contractAddress,
      this.contractABI,
      this.provider
    );
  }

  async getHelloWorld(): Promise<string> {
    return await this.contract.helloWorld();
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
