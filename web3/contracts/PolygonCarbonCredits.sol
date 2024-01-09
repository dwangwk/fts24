// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PolygonCarbonCredits is ERC20, Ownable {

    // Constructor
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 100000 * 10**decimals());
    }

    // Mint new tokens
    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }

    // Burn tokens
    function burn(address account, uint256 amount) public onlyOwner {
        _burn(account, amount);
    }

    // Transfer tokens
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
}
