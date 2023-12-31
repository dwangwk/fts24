import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const MintTokens = async (data) => {
    const to = data.values.recipientAddress;
    const amount = data.values.amount;
    const signer = data.signer;
    const cid = require("../keys.json")["client-id"];
    const sk = require("../keys.json")["secret-key"];
    const sdk = ThirdwebSDK.fromSigner(signer, Sepolia, {clientId : cid, secretKey : sk}).catch(
        (error) => {console.log(error);}
    );
    const contract = await sdk.getContract("0x9F4b9142b4890bD392B0C981df1F5DbdFDc79374");
    const resp = await contract.call("mintTokens", [to, amount]).catch(
        (error) => {console.log(error);}
    );
}

export default MintTokens