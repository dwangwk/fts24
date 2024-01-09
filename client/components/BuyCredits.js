const ethers = require('ethers');

// Replace these values with your contract address and private key
const contractAddress = '0xa3561049D48b0269B52C8fB7a2a0ec88Df5D8E47';
const privateKey = '0xYourPrivateKey';

// Connect to the Polygon network using Infura or any other provider
const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com');

// Create a wallet instance using your private key
const wallet = new ethers.Wallet(privateKey, provider);

// ABI (Application Binary Interface) of the BridgeBase contract
const abi = /* ... Paste the ABI here ... */;

// Create a contract instance
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Example: Buy credits by calling the 'mint' function
async function buyCredits(to, amount, nonce) {
    // You may want to sign this message offline and use the generated signature here
    const signature = '0xYourSignature'; // Replace with the actual signature

    try {
        const tx = await contract.mint(wallet.address, to, amount, nonce, signature);
        await tx.wait();

        console.log(`Bought ${amount} credits successfully!`);
    } catch (error) {
        console.error('Error buying credits:', error.message);
    }
}

// Replace the arguments with actual values
const recipientAddress = '0xRecipientAddress';
const creditAmount = 100;
const transactionNonce = 1;

// Call the function to interact with the contract and buy credits
buyCredits(recipientAddress, creditAmount, transactionNonce);
