// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./ProjectListing.sol";

contract CarbonProjectProducer {
    address[] public ProjectAddresses;

    event ListProject(address indexed projectAddress);

    function listProject(string calldata name, string calldata description, uint256 targetAmount) public returns (address) {
        ProjectListing c = new ProjectListing(name, description, targetAmount, msg.sender);
        ProjectAddresses.push(address(c));
        emit ListProject(address(c));
        return address(c);
    }

    function getProjectAddresses() public view returns (address[] memory) {
        return ProjectAddresses;
    }
}