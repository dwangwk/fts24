import { ethers } from "ethers";
import { auth } from "../db/firebase";
import { db } from "../db/firebase";
import { getDoc, doc } from "firebase/firestore";
import { updateTransaction } from "./Transactions";

const tokens = new Map();
tokens.set("KILMA", "0x078a711a6d52CDe57Cbd9dd0ed70f3F960781e12");
tokens.set("MCO2", "0x0C7AdaF776B78739F50B284Da52b8875E3056406");
tokens.set("ECO", "0x1838926a37C0E768501b59785749C7f494e9c9d8");

const abi = ["function mint(address to, uint256 amount) external",
        "function updateAdmin(address newAdmin) external",
        "function burn(address owner, uint256 amount) external"]

const abi2 = [
        "function transfer_remove (address token, uint256 amount) external",
        "function deposit(address token, uint256 amount) external payable",
        "function withdraw(address token, uint256 amount) external",
        "function getBalances(address token_) public view returns (uint)",
];

const BuyTokensNative = async (d) => {
    const to_username = auth.currentUser.email;
    const data = d.data;
    const amount = ethers.utils.parseEther(`${data.amount}`);
    const to_wallet = await getDoc(doc(db, "users", to_username));
    const token = tokens.get(d.token);
    const to = to_wallet.data()["walletAddress"];
    const private_key = require("../pages/web3/keys.json")["meta-mask"];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = new ethers.Wallet(private_key, provider);
    const contract = new ethers.Contract(token, abi, signer);
    const updatestate_ = new ethers.Contract(to, abi2, signer);
    //const tx2 = await contract.mint(to, amount);
    const tx = await updatestate_.deposit(token, amount);
    //console.log("tx success: ", tx);
    const rc = await tx.wait();
    //const rc2 = await tx2.wait();
    const tx_details = {"user" : auth.currentUser.displayName, "rc" : rc};
    console.log("rc recieved, initiating logging.")
    updateTransaction(tx_details);
    console.log(rc);
    //console.log(rc2);
}

export default BuyTokensNative