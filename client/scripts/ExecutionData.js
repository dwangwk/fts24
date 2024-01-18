import { db, auth } from "../db/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const pullExecutionAmount = async() => {
    const username = auth.currentUser.email;
    const docref = await getDoc(doc(db, "users", username));
    console.log("pulled: ", docref) ;
    const amount = docref.data()["executed"].toFixed(2);
    return amount;
}

export const updateExecutionAmount = async(to_add) => {
    const username = auth.currentUser.email;
    const dc = doc(db, "users", username)
    const docref = await getDoc(dc);
    const wallet = docref.data()["walletAddress"];
    var amount = parseFloat(docref.data()["executed"]);
    console.log("initial: ", amount);
    amount += to_add;
    console.log("updated: ", amount);
    setDoc(dc, { walletAddress : wallet, executed : amount });
}