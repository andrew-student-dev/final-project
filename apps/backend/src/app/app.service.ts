import { Injectable, OnModuleInit } from '@nestjs/common';
import { JsonRpcProvider, ethers } from 'ethers';

@Injectable()
export class AppService implements OnModuleInit {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;

  private readonly contractAddress =
    '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  private readonly contractABI = [
    'function helloWorld() public view returns (string memory)',
    'function setText(string memory newText) public',
  ];

  async onModuleInit() {
    this.provider = new JsonRpcProvider('http://localhost:8545', undefined, {
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
