import "@rainbow-me/rainbowkit/styles.css";
import {useAccount} from "wagmi";
import { StartGame } from '../components/StartGame';
import { CloseGame } from '../components/CloseGame';
import { RequestTokens } from '../components/RequestTokens';
import { AwardGoldenTicket } from '../components/AwardGoldenTicket';
import { EnterContest } from "../components/EnterContest";
import { TestBalanceOf } from "../components/TestBalanceOf";
import { TestBalanceFrom } from "../components/TestBalanceFrom";
import {TestNftData} from "../components/TestNftData"
import { GameStateListener } from "../components/GameStateListener";
import { ComeOnDown } from "../components/ComeOnDown";

export function App() {
  const {address} = useAccount();
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">The Price is Right</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">Connected Address:</p>
            {/* <Address address={connectedAddress} /> */}
            <p>{address}</p>
          </div>
          {/* <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p> */}
        </div>
        <GameStateListener />
        <RequestTokens />
        <StartGame />
        <CloseGame />
        <EnterContest />
        <AwardGoldenTicket />
        <TestBalanceOf />
        <TestBalanceFrom />
        <TestNftData />
        <ComeOnDown />
        {/* <TestFundFaucet /> */}

        {/* <HelloWorld></HelloWorld>
        <TestButton />
        <br></br>
        <SetHelloText /> */}


        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              {/* <BugAntIcon className="h-8 w-8 fill-secondary" /> */}
              <p>
                Tinker with your smart contract using the{" "}
                {/* <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "} */}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              {/* <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" /> */}
              <p>
                Explore your local transactions with the{" "}
                {/* <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "} */}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
