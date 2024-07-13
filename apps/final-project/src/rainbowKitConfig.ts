import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { sepolia, hardhat } from "wagmi/chains";

export const rainbowConfig = getDefaultConfig({
  appName: "final-project",
  projectId: "HZK2kn4-LzdZ2DQt5LCB2kjHvgdd5tFE",
  chains: [sepolia, hardhat],
  ssr: false //set to true if using server side rendering (eg NextJs)
})