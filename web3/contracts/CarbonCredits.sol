// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC20Base.sol";

contract CarbonCredits is ERC20Base {
    // Superadmin address
    address private _superAdmin;
      
      constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol
    )
        ERC20Base(
            _defaultAdmin,
            _name,
            _symbol
        )
    {
        _superAdmin = _defaultAdmin;
    }

     // Modifier to ensure that only the superadmin can call the mintTokens function
    modifier onlySuperAdmin() {
        require(msg.sender == _superAdmin, "Not authorized: only superadmin can call this function");
        _;
    }

    // Function to mint new tokens
    function mintTokens(address _recipient, uint256 _amount) external onlySuperAdmin {
        _mint(_recipient, _amount);
    }
}