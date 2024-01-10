import { ethers } from "ethers";
import { auth } from "../db/firebase";
import { db } from "../db/firebase";
import { getDoc, doc } from "firebase/firestore";
import crypto from "crypto";
import { BigNumber } from "ethers";

const abi = [
    "event Transfer(address indexed from, address indexed to, uint256 amount, uint256 date, uint256 nonce, Step indexed step)",
    "event AdminSet(address indexed admin)",
    "function burn(address to, uint256 amount, uint256 nonce) external",
    "function mint(address from, address to, uint256 amount, uint256 nonce) external"
]

const abi2 = [
    "function transfer_remove (address token, uint amount) external owner_only",
    "function deposit(address token, uint amount) external payable",
    "function withdraw(address token, uint amount) external owner_only",
    "function getBalances(address token_) public view returns (uint)",
    ]

const BuyTokensCrossChain = async (data) => {
    const to_username = auth.currentUser.email;
    const amount = BigNumber.from(data.amount);
    const polygonToETH = "0x041511a59a97EaDF265e203454F4e44e25f51f5a";
    const ETHToPolygon = "0x93983fA1eCB961A7eD960c98eE9b49e521042d58";
    const to_wallet = await getDoc(doc(db, "users", to_username));
    const to = to_wallet.data()["walletAddress"];
    const private_key = require("../pages/web3/keys.json")["meta-mask"];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = new ethers.Wallet(private_key, provider);
    const nonce = crypto.randomBytes(16).toString('base64');
    const eth_to_poly = new ethers.Contract(ETHToPolygon, abi, signer);
    const poly_to_eth = new ethers.Contract(polygonToETH, abi, signer);
    var tx = await eth_to_poly.burn(to, amount, nonce);
    var rc = await tx.wait();
    console.log(rc.events[0]);
    tx = await poly_to_eth.mint(to, amount, nonce);
    var rc = await tx.wait();
    console.log(rc.events[0]);
    const updatestate_ = new ethers.Contract(to, abi2, signer);
    await updatestate_.deposit(token, amount);
}

export default BuyTokensCrossChain