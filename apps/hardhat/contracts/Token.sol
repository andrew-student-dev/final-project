// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Token is ERC20 {
  address private owner;

  modifier onlyOwner {
    require(msg.sender == owner, "Caller is not the owner");
    _;
  }

  // @dev add logic to mint total supply when deploying ERC20
  // or add onlyOwner mint() function so new coins can be minted at any time
  constructor(address _owner, uint256 _initialSupply) ERC20("PriceIsRightToken", "PRT") {
    owner = _owner;
    _mint(_owner, _initialSupply);
  }

  function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}