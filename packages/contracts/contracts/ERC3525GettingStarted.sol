// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@solvprotocol/erc-3525/ERC3525SlotEnumerable.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ERC3525GettingStarted is ERC3525SlotEnumerable {
  using Strings for uint256;

  address public owner;

  constructor(address owner_) ERC3525SlotEnumerable("ERC3525GettingStarted", "ERC3525GS", 18) {
    owner = owner_;
  }

  function mint(address to_, uint256 slot_, uint256 amount_) external {
    require(msg.sender == owner, "ERC3525GettingStarted: only owner can mint");
    _mint(to_, slot_, amount_);
  }

  function tokenURI(uint256 tokenId_) public view virtual override returns (string memory) {
    return string(abi.encodePacked("hogehoge"));
  }
}
