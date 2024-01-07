import { ethers } from "ethers";
import { db } from "../db/firebase";
import { setDoc, doc } from "firebase/firestore";

const abi = [
    "function createNewWallet(string calldata name) public returns (address)",
    "function getAllWallets() public view returns (address[] memory)",
    "event CreateWallet(address indexed new_address)",
]

const createWallet = async (data) => {
    const wallet_controller = "0x041511a59a97EaDF265e203454F4e44e25f51f5a";
    const under_custody = data.email;
    const private_key = require("../pages/web3/keys.json")["meta-mask"];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = new ethers.Wallet(private_key, provider);
    const contract = new ethers.Contract(wallet_controller, abi, signer);
    const tx = await contract.createNewWallet(under_custody);
    const rc = await tx.wait();
    const assigned_wallet = rc.events[0].args['new_address'];
    console.log("assigned to: ", assigned_wallet);
    const docref = await setDoc(doc(db, "users", under_custody),
        {walletAddress : assigned_wallet}
    ).catch((err) => {console.log(err);});
    console.log("Created entry in db ", docref);
}

export default createWallet;