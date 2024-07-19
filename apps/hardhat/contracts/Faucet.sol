// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Faucet {
  IERC20 public token;
  uint256 public amountAllowed;
  uint256 public cooldownTime; // 24 hrs in seconds
  mapping(address => uint256) public lastRequestTime;

  constructor (IERC20 _token, uint256 _amountAllowed, uint256 _cooldownTime) {
    token = _token;
    amountAllowed = _amountAllowed;
    cooldownTime = _cooldownTime;
  }


    function requestTokens() external {
        require(block.timestamp >= lastRequestTime[msg.sender] + cooldownTime, "Request tokens only once in 24 hours");
        require(token.balanceOf(address(this)) >= amountAllowed, "Not enough tokens in the faucet");

        lastRequestTime[msg.sender] = block.timestamp;
        token.transfer(msg.sender, amountAllowed);
    }


}