// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.0/contracts/token/ERC20/IERC20.sol";

// Destination chain: chain selector given by CCIP
// _reciever: your account on the destination chain
// _token : The contract address on the source chain
// amt : The transfer token amount.

contract TransferCredits is OwnerIsCreator {

    error FailedToWithdrawEth(address from, address to, uint256 value);
    error DestinationChainNotAllowlisted(uint64 _destchain);
    error NotEnoughBalance(uint256 curr, uint256 needed);

    // Router address
    IRouterClient private s_router;

    // Link contract address
    IERC20 private s_linkToken;

    // Allowed chains
    mapping(uint64 => bool) public allowedChains;

    event TokenTransfer(
        bytes32 indexed id,
        uint64 indexed destchain,
        address reciever,
        address token,
        uint256 token_amt,
        address token_fee,
        uint256 fees
        );

    constructor(address _router, address _link) {
        s_router = IRouterClient(_router);
        s_linkToken = IERC20(_link);
    }
    
    modifier approvedchain(uint64 _destchain) {
        if (!allowedChains[_destchain]) {
            revert DestinationChainNotAllowlisted(_destchain);
        }
        _;
    }

    function modifyAllowedChains(uint64 _destchain, bool allowed) external onlyOwner {
        allowedChains[_destchain] = allowed;
    }

    function transferTokensPayNative(uint64 _destchain, address _reciever, 
        address _token, uint256 amt) external 
            onlyOwner approvedchain(_destchain) returns (bytes32 msgId) {
        Client.EVM2AnyMessage memory evm2AnyMessage = _buildCCIPMessage(
            _reciever, _token, amt, address(0) // Address zero = pay in native.
        );
        
        // Ensure CCIP gas fees can be paid.
        uint256 fees = s_router.getFee(_destchain, evm2AnyMessage);
        if (fees > address(this).balance) {
            revert NotEnoughBalance(address(this).balance, fees);
        }

        // give router permission to interact with tokens.
        s_linkToken.approve(address(s_router), fees);
        IERC20(_token).approve(address(s_router), fees);
        
        // Transfer tokens.
        bytes32 id = s_router.ccipSend(_destchain, evm2AnyMessage);
        emit TokenTransfer(id, _destchain, _reciever, _token, amt, address(s_linkToken), fees);
        return id;
    }

    function _buildCCIPMessage(address _reciever, address _token, 
        uint256 amt, address _tokenaddr) internal pure returns (Client.EVM2AnyMessage memory) {
            Client.EVMTokenAmount[] memory tokenAmt = new Client.EVMTokenAmount[](1);
            tokenAmt[0] = Client.EVMTokenAmount({token : _token, amount : amt});
            // EVM2AnyMessage struct to conduct cross-chain message.
            return Client.EVM2AnyMessage({
                receiver : abi.encode(_reciever),
                data : "",
                tokenAmounts : tokenAmt,
                // Gas limit 0 => no data submitted alongside token.
                extraArgs : Client._argsToBytes(Client.EVMExtraArgsV1({gasLimit : 0})),
                feeToken : _tokenaddr
            });
    }

    function withdrawContractEther(address to) public onlyOwner {
        // Withdraws all the ETH balance from this contract.
        uint256 amt = address(this).balance;
        if (amt > 0) {
            (bool success,) = to.call{value : amt}("");
            if (!success) {
                revert FailedToWithdrawEth(msg.sender, to, amt);
            }
        }
    }

    function withdrawContractToken(address to, address _token) public onlyOwner {
        // Withdraws all tokens of the specific ERC20 type.
        uint256 amt = IERC20(_token).balanceOf(address(this));
        if (amt > 0) {
            IERC20(_token).transfer(to, amt);
        }
    }

}