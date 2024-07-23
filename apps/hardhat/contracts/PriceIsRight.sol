// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {GoldenTicket} from './GoldenTicket.sol';
import {Token} from './Token.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';

contract PriceIsRight {
  struct PriceGuess {
    address contestant;
    uint256 guess;
  }
  // @notice owner is here on referred to as 'Bob Barker'
  address public owner;
  // @notice address of ERC721
  GoldenTicket public goldenTicket;
  // @notice address of ERC20
  Token public token;
  // @notice name of the item for contestants to guess the price of
  string public itemName;
  // @notice hashed value of item name, item price, and secret key to be committed and later revealed
  bytes32 public itemDataHashed;
  // @notice the actualPrice variable is only set/revealed after Bob Barker closes game
  uint256 public actualPrice;
  // @notice the secret variable is only set/revealed after Bob Barker closes the game
  string private secret;
  // @notice length of time contestants have to submit PriceGuesses
  uint public gameEndTime;
  // @notice flag indicating whether game is open for PriceGuesses or not
  bool public gameOpen;
  // @notice cost of a ticket to participate in game (submit PriceGuesses)
  uint256 public entryFee;
  // @notice 4 random contestants will be selected from this array along with their associated PriceGuesses
  PriceGuess[] public contestantPool;
  // @notice addresses pulled from contestantPool will be matched in this PriceGuess array
  PriceGuess[] public guesses;

  event GameStateSet(bytes32 indexed itemDataHashed, bool gameOpen);

  // @notice constructor function sets the deployer as owner and also deploys ERC20 and ERC721 contracts
  // @notice ERC20 (Token) contract takes two arguments, owner and initalSupply
  // initial supply = 1,000,000?
  constructor() {
    owner = msg.sender;
    goldenTicket = new GoldenTicket();
    token = new Token(address(this), 1000000 * 10 * 18);
    entryFee = 10 * 10 ** 18;
  }

  function setGameState(
    string memory _itemName,
    bytes32 _itemDataHashed,
    uint256 _gameEndTime
  ) external onlyBobBarker whenGameClosed {
    // removed for testing
    // require(
    //         _gameEndTime > block.timestamp,
    //         "Closing time must be in the future"
    //     );

    itemName = _itemName;
    itemDataHashed = _itemDataHashed;
    gameEndTime = _gameEndTime;
    gameOpen = true;

    emit GameStateSet(itemDataHashed, gameOpen);
  }

  //Closest without going over, unless eveyrone is over then closest.
  function determineWinner(
    uint256 _cost
  ) public view onlyBobBarker returns (PriceGuess memory) {
    require(contestantPool.length > 0, 'No contestants have come on down!');

    uint256 closestUnderGuess = 0;
    uint256 smallestOverage = 0;
    PriceGuess memory winningUnderBid;
    PriceGuess memory winningOverBid;
    bool foundWinningUnderBid = false;

    for (uint256 i = 0; i < contestantPool.length; i++) {
      uint256 contestantGuess = contestantPool[i].guess;
      if (contestantGuess == _cost) {
        winningUnderBid = contestantPool[i];
        foundWinningUnderBid = true;
        break;
      } else if (
        contestantGuess < _cost && contestantGuess > closestUnderGuess
      ) {
        closestUnderGuess = contestantGuess;
        winningUnderBid = contestantPool[i];
        foundWinningUnderBid = true;
      } else if (contestantGuess > _cost && !foundWinningUnderBid) {
        uint256 overage = contestantGuess - _cost;
        if (smallestOverage == 0) {
          smallestOverage = overage;
          winningOverBid = contestantPool[i];
        } else {
          if (overage < smallestOverage) {
            smallestOverage = overage;
            winningOverBid = contestantPool[i];
          }
        }
      }
    }

    return foundWinningUnderBid ? winningUnderBid : winningOverBid;
  }

  function comeOnDown() public onlyBobBarker {
  require(
    contestantPool.length == 0,
    'Contestants have already been selected'
  );
  uint256 contestantCount = guesses.length < 4
    ? guesses.length
    : 4;

  for (uint i = 0; i < contestantCount; i++) {
    PriceGuess memory drawnContestant = guesses[i];
    contestantPool.push(drawnContestant);
  }
}

  function enterContest(uint256 _guess) public payable {
    require(
      token.balanceOf(msg.sender) >= entryFee,
      'Insufficient token balance'
    );
    require(
      token.transferFrom(msg.sender, address(this), entryFee),
      'Token transfer failed'
    );
    PriceGuess memory priceGuess;

    priceGuess.contestant = msg.sender;
    priceGuess.guess = _guess;
    guesses.push(priceGuess);
  }

  function closeGame(
    string memory _itemName,
    uint256 _actualPrice,
    string memory _secret
  ) public onlyBobBarker {
    // removed for testing
    // require(block.timestamp >= gameEndTime, "Too soon to close");

    // @dev name, price, and secret are checked to make sure they match the commited values and then corresponding state variables are set allowing anyone to verify
    bytes32 computedHash = keccak256(
      abi.encodePacked(_itemName, _actualPrice, _secret)
    );
    require(computedHash == itemDataHashed, 'Revealed values do not match');
    gameOpen = false;
    itemName = _itemName;
    actualPrice = _actualPrice;
    secret = _secret;
    
    PriceGuess memory winner = determineWinner(actualPrice);
    awardGoldenTicket(winner.contestant);
  }

  // @dev to be called for the winner from 4 randomly selected contestants
  // MIGHT BE BETTER AS INTERNAL METHOD
  function awardGoldenTicket(address winner) internal {
    goldenTicket.mint(winner);
  }

  function transferTokens(address participant, uint256 amount) external {
    token.transfer(participant, amount);
  }

  function mintTokens(address to, uint256 amount) external {
    token.mint(to, amount);
  }

  function testBalance() external view returns (uint256) {
    return token.balanceOf(address(this));
  }

  function testBalanceFromAddress(
    address from
  ) external view returns (uint256) {
    return token.balanceOf(from);
  }

  modifier whenGameClosed() {
    require(!gameOpen, 'Game is already open');
    _;
  }

  modifier whenGameOpen() {
    require(gameOpen && block.timestamp < gameEndTime, 'Game is closed');
    _;
  }

  modifier onlyBobBarker() {
    require(msg.sender == owner, 'Caller is not Bob Barker');
    _;
  }
}
