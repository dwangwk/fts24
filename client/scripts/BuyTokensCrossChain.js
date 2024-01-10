import { ethers } from "ethers";
import { auth } from "../db/firebase";
import { db } from "../db/firebase";
import { getDoc, doc } from "firebase/firestore";
import crypto from "crypto";
import { BigNumber } from "ethers";

const abi = [
    "event Transfer(address indexed from, address indexed to, uint256 amount, uint256 date, uint256 nonce, Step indexed step)",
    "event AdminSet(address indexed admin)",
    "function burn(address to, uint256 amount) external",
    "function mint(address to, uint256 amount) external"
]

const abi2 = [
    "function transfer_remove (address token, uint amount) external",
    "function deposit(address token, uint amount) external payable",
    "function withdraw(address token, uint amount) external",
    "function getBalances(address token_) public view returns (uint)",
    ]

const BuyTokensCrossChain = async (data) => {
    console.log(data);
    const to_username = auth.currentUser.email;
    const amount = ethers.utils.parseEther(`${data.amount}`);
    const gasFees = ethers.utils.parseEther("3");
    const polygonToETH = "0xb3d03b066e6960259d23D7916cEC0C397e592141";
    const ETHToPolygon = "0xab711297678b56E6e9ADAd3648a7C5fE6d166e71";
    const to_wallet = await getDoc(doc(db, "users", to_username));
    const to = to_wallet.data()["walletAddress"];
    const private_key = require("../pages/web3/keys.json")["meta-mask"];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = new ethers.Wallet(private_key, provider);
    const eth_to_poly = new ethers.Contract(ETHToPolygon, abi, signer);
    console.log("contract established: ", eth_to_poly);
    const poly_to_eth = new ethers.Contract(polygonToETH, abi, signer);
    console.log("contract established: ", poly_to_eth);
    var tx = await eth_to_poly.burn(to, amount, {gasLimit: gasFees});
    console.log("burn: ", tx);
    var rc = await tx.wait();
    console.log(rc.events[0]);
    tx = await poly_to_eth.mint(to, amount, {gasLimit: gasFees});
    console.log("mint: ", tx);
    var rc = await tx.wait();
    console.log(rc.events[0]);
    const updatestate_ = new ethers.Contract(to, abi2, signer);
    await updatestate_.deposit(token, amount);
}

export default BuyTokensCrossChain