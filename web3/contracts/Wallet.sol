// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/contracts/token/ERC20/IERC20.sol";

contract Wallet {

    mapping(address => uint) public balance;

    address private owner;
    
    string public name;

    constructor(string memory _name, address _owner) {
        name = _name;
        owner = _owner;
    }

    modifier owner_only() {require(owner == owner, "Only owner can call this function."); _;}

    function deposit(address token, uint amount) external payable {
        balance[token] += amount;
    }

    function withdraw(address token, uint amount) external owner_only {
        require(amount > balance[token], "You do not have enough to withdraw.");
        balance[token] -= amount;
        payable(owner).transfer(amount);
    }

    function getBalances(address token_) public view returns (uint) {
        return balance[token_];
    }
}