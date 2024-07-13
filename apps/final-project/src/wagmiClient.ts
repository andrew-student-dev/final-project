import {http, createConfig} from "wagmi"
import {hardhat, sepolia} from "wagmi/chains"

export const config = createConfig({
  chains: [hardhat, sepolia],
  transports: {
    [hardhat.id]: http(),
    [sepolia.id]: http()
  }
})
