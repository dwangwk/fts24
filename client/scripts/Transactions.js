import { db } from "../db/firebase";
import { query, orderBy, limit, collection, setDoc, doc, getDocs } from "firebase/firestore";

export const pullTransaction = async() => {
    const tx_data = collection(db, "transactions");
    const q = query(tx_data, orderBy("timestamp", "desc"), limit(10));
    const snapshot = await getDocs(q);
    console.log("snapshot: ", snapshot);
    const ret = [];
    snapshot.forEach(x => {ret.push(x.data())});
    console.log("return: ", ret);
    return ret;
}

export const updateTransaction = async(tx_details) => {
    const tx_party = tx_details.user;
    const tx_rc = tx_details.rc;
    const tx_hash = tx_rc.transactionHash;
    const time = Date().toLocaleString();
    const link = `https://sepolia.etherscan.io/tx/${tx_hash}`
    console.log("trying to add tx...")
    await setDoc(doc(db, "transactions", time), {
        "hash" : tx_hash, "party" : tx_party, "link" : link, "timestamp" : time
    }).catch((err) => {console.log(err)});
    console.log("added tx: ", tx_details);
}
