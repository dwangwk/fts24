import { db, auth } from "../db/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import { jsPDF } from "jspdf";

const PullData = async(tdata) => {
    const start_duration = tdata.start;
    const end_duration = tdata.end;
    console.log("queries_start: ", start_duration);
    console.log("queries_end: ", end_duration);
    const cuser = auth.currentUser.displayName;
    const tx_data = collection(db, "transactions");
    const q = query(tx_data, where("party", "==", cuser), where("timestamp", ">=", start_duration),
    where("timestamp", "<=", end_duration));
    const snapshot = await getDocs(q);
    console.log("snapshot: ", snapshot);
    const ret = [];
    snapshot.forEach(x => {ret.push(x.data())});
    console.log("return: ", ret);
    const doc = new jsPDF();      
    const processed = ret.map(x => {
        const timestamp = x.timestamp;
        const hash = x.hash;
        const link  = x.link;
        const new_section = link + "\n" + hash + "\n" + timestamp + "\n";
        return new_section;
    });
    console.log(processed);
    let concat = processed.join("\n");
    doc.setFontSize(10);
    console.log(concat);
    const ctime = Date().toLocaleString();
    doc.text(concat, 2, 2);
    doc.save(`${cuser}-transactions-${start_duration}-to-${end_duration}.pdf`);
}

export default PullData