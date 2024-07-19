// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GoldenTicket is ERC721, Ownable {
  
  constructor() ERC721("GoldenTicket", "GDT") Ownable(msg.sender){
  }

  struct TokenMetaData {
    string name;
    string description;
    string uri;
  }

  uint256 tokenId;

  mapping(uint256 => TokenMetaData) public tokenMetaData;
  mapping(address => uint256[]) public ownedTokens;
  

    function mint(
        address _to
    ) external onlyOwner {
        _mint(_to, tokenId);
        tokenId++;
    }
}