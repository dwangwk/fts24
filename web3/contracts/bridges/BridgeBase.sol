// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

interface IToken {
    function burn(address account, uint256 amount) external;
    function mint(address account, uint256 amount) external;
}

contract BridgeBase is Ownable {
    address public admin;
    IToken public token;
    mapping(address => mapping(uint => bool)) processedNonces;

    enum Step { Mint, Burn }

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 amount,
        uint256 date,
        uint256 nonce,
        Step indexed step
    );

    constructor(address _token) {
        admin = msg.sender;
        token = IToken(_token);
        // Add the following line to print or log the address
        emit AdminSet(admin);
    }

    event AdminSet(address indexed admin);

    function burn(address to, uint256 amount, uint256 nonce) external {
        require(!processedNonces[msg.sender][nonce], "Transfer Processed.");
        processedNonces[msg.sender][nonce] = true;
        token.burn(msg.sender, amount);
        emit Transfer(msg.sender, to, amount, block.timestamp, nonce, Step.Burn);
    }

    function mint(address to, uint256 amount, uint256 nonce) external {
        require(!processedNonces[msg.sender][nonce], "Transfer Processed.");
        processedNonces[msg.sender][nonce] = true;
        token.mint(to, amount);
        emit Transfer(msg.sender, to, amount, block.timestamp, nonce, Step.Mint);
    }
}
