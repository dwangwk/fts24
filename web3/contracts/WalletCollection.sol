// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Wallet.sol";

contract WalletCollection {

    address[] public wallets;

    event CreateWallet(address indexed new_address);

    function createNewWallet(string calldata name) public returns (address) {
        Wallet new_wallet = new Wallet(name, msg.sender);
        wallets.push(address(new_wallet));
        emit CreateWallet(address(new_wallet));
        return address(new_wallet);
    }

    function getAllWallets() public view returns (address[] memory) {
        return wallets;
    }
}
