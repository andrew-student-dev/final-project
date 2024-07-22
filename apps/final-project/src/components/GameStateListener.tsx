import { useEffect, useState } from "react";
import { usePriceIsRightContract } from "./usePriceIsRightContract";

export function GameStateListener() {
  const [isGameOpen, setIsGameOpen] = useState();
  const [dataHash, setDataHash] = useState();

  const {contract} = usePriceIsRightContract();

  useEffect(() => {
    if(!contract) return;
    const filter = contract.filters.GameStateSet();
    contract.on(filter, (itemDataHash, gameOpen) => {
      setIsGameOpen(gameOpen);
      setDataHash(itemDataHash);
    })

    return() => {
      contract.off(filter);
    }

  }, [])

  return (
    <div>
      {isGameOpen && (
        <div>
          <p>Game State Hash: {dataHash}</p>
          <p>Game Open: {isGameOpen ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
  
}