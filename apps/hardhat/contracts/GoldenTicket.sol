// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GoldenTicket is ERC721URIStorage {
  uint256 private _nextTokenId;


  string private tokenUri = "http://127.0.0.1:8080/ipfs/QmbpwUBVHPZjbWNRJA9wTADH6nkkcVdRMjE9ZhbY7Dr614";
  
  constructor() ERC721("Golden Ticket", "GDT") {
    
  }

  struct TokenMetaData {
    string name;
    string description;
  }

  uint256 tokenId;

  mapping(uint256 => TokenMetaData) public tokenMetaData;
  mapping(address => uint256[]) public ownedTokens;
  

    function mint(
        address _to
    ) external {
        _mint(_to, tokenId);
        _setTokenURI(tokenId ,tokenUri);
        tokenId++;
    }
}