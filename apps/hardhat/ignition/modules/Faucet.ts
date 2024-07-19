import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import PriceIsRightModule from './PriceIsRight';
import {ethers} from "hardhat";
import * as dotenv from "dotenv"
dotenv.config();

const FaucetModule = buildModule('FaucetModule', (m) => {
  m.useModule(PriceIsRightModule);

  const tokenAddress = "0xB7A5bd0345EF1Cc5E66bf61BdeC17D2461fBd968"
  // deploy PriceIsRight first then get token address then Put in .env
  // const tokenAddress: any = process.env.TOKEN_ADDRESS;
  const amountAllowed = ethers.parseUnits("100"); // 100 tokens to smallest unit (18 decimals/wei) 
  const cooldownTime = 86400 // 24 hours in seconds
  
  const hw = m.contract('Faucet', [tokenAddress, amountAllowed, cooldownTime]);

  return { hw };
});

export default FaucetModule;