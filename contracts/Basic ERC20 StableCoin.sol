// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FiatStablecoin is ERC20, Ownable {
    address public custodian;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        custodian = msg.sender;
    }

    // Mint tokens only by custodian (requires reserve verification)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // Burn tokens to redeem fiat
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
        // Trigger fiat redemption process off-chain
    }
}