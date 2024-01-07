import { Sepolia } from "@thirdweb-dev/chains";
import { ethers } from "ethers";
import { db } from "../db/firebase";
import { setDoc, doc } from "firebase/firestore";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const createWallet = async (data) => {
    const wallet_controller = "0x041511a59a97EaDF265e203454F4e44e25f51f5a";
    const under_custody = data.email;
    const private_key = require("../pages/web3/keys.json")["meta-mask"];
    const cid = require("../pages/web3/keys.json")["client-id"];
    const sk = require("../pages/web3/keys.json")["secret-key"];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = new ethers.Wallet(private_key, provider);
    
    const sdk = ThirdwebSDK.fromSigner(signer, Sepolia, {clientId : cid, secretKey : sk});
    const contract = await sdk.getContract(wallet_controller);
    await contract.call("createNewWallet", [under_custody]).catch(
        (error) => {console.log(error);}
    ).then(async (resp) => {
        console.log(resp);
        const docref = await setDoc(doc(db, "users", under_custody), {
            name : under_custody,
            wallet_address : resp,
        });
        console.log("Wallet created and added to db: ", docref);
    });
}

export default createWallet;