import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const createWallet = async (data) => {
    wallet_controller = ""; // Wallet controller 
    const under_custody = data.username;
    const signer = ""; // admin username here
    const cid = require("../pages/web3/keys.json")["client-id"];
    const sk = require("../pages/web3/keys.json")["secret-key"];
    const sdk = ThirdwebSDK.fromSigner(signer, Sepolia, {clientId : cid, secretKey : sk}).catch(
        (error) => {console.log(error);}
    );
    const contract = await sdk.getContract(wallet_controller);
    const resp = await contract.call("createNewWallet", [under_custody]).catch(
        (error) => {console.log(error);}
    );
}