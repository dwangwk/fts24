import { ethers } from "ethers";
import { auth } from "../db/firebase";
import { db } from "../db/firebase";
import { getDoc, doc } from "firebase/firestore";
import crypto from "crypto";

const tokens = map();
map.set("KILMA", "0x078a711a6d52CDe57Cbd9dd0ed70f3F960781e12");
map.set("Wrapped-TCO2", "0x74799280A3Ee2C92f454dAd4fA57E18a96346a76");
map.set("TCO2", "0x9F4b9142b4890bD392B0C981df1F5DbdFDc79374");

abi = ["function mint(address to, uint amount) external",
        "function updateAdmin(address newAdmin) external",
        "function burn(address owner, uint amount) external"]

const BuyTokensNative = async (data) => {
    const to_username = auth.currentUser.email;
    const amount = data.amount;
    const to_wallet = await getDoc(doc(db, "users", to_username));
    const token = tokens[data.token];
    const to = to_wallet.data()["walletAddress"];
    const private_key = require("../pages/web3/keys.json")["meta-mask"];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = new ethers.Wallet(private_key, provider);
    const contract = new ethers.Contract(token, abi, signer);
    const tx = contract.mint(to_username, amount);
    await tx.wait().then((rc) => 
        {console.log(rc.events[0])}).catch((err) => {console.log(err)});
}

export default BuyTokensNative