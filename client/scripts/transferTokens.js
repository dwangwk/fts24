import { ethers } from "ethers";
import { auth } from "../../db/firebase.js";
import { db } from "../db/firebase";
import { getDoc, doc } from "firebase/firestore";

const abi = [
    "function transfer_remove (address token, uint amount) external owner_only",
    "function deposit(address token, uint amount) external payable",
    "function withdraw(address token, uint amount) external owner_only",
    "function getBalances(address token_) public view returns (uint)",
]

const transferToken = async (data) => {
    const to_username = data.to;
    const from_username = auth.currentUser.email;
    const amount = data.amt;
    const token = data.token;
    const from_contract = await getDoc(doc(db, "users", from_username));
    const to_contract = await getDoc(doc(db, "users", to_username));
    if (!to_contract.exists()) {
        console.log(to_username, " does not exist.")
    }
    const from_ = from_contract["walletAddress"];
    const to_ = to_contract["walletAddress"];
    const private_key = require("../pages/web3/keys.json")["meta-mask"];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = new ethers.Wallet(private_key, provider);
    const contract = new ethers.Contract(from_, abi, signer);
    const tx = await contract.transfer_remove(token, amount);
    await tx.wait().then(async (rc) => {
        const contract_ = new ethers.Contract(to_, abi, signer);
        const tx_ = await contract_.deposit(token, amount);
        await tx_.wait().catch((err) => {
            console.log("Error in Deposit: ", err);
        })
    }
    ).catch((err) => {console.log("Error in withdrawal: ", err);});
}

export default transferToken;