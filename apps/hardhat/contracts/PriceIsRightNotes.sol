// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract PriceIsRightNotes {
  uint public unlockTime;
  address payable public owner;
  address ERC20;
  address ERC721; // NFT for Golden Ticket
  uint256 entryFee;
  uint256 ratio; // 0.01 eth = 1 ticket ?
  address[]contestantPool; // select 4 random contestants from this pool
  

  constructor() payable {
   1. set paymentToken
   2. set participationToken

  }

  function setGameState () {
    only bob barker
    3. set itemName
    4. set itemPrice(hashed)
    5. set futureDate for entries to end
    6. game is set to ON
  }

  function purchaseEntryNFT payable(){
    use some ratio and credit NFT
  }

  function cashOUtNFT payable (){
    convert your NFT to eth and receive
  }

  function enterPIR (NFT entry, bid) {
    a. require game has started
    1. require they are not in the game
    2. deduct token
    3. add to contestant pool with bid
  }

  function determineWinner(){
    onlyBobBarker
    require there are contestnatns
    require gametime is done
    up to 4 contestants are chosen
    of the 4 contestnats the bid that is closest without going over is awarded the entire contestant prize pool
    give golden ticket
  }
}
