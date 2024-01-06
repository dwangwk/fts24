import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = require("./firebase_config.json")
const db = initializeApp(firebaseConfig);
export const auth = getAuth(db);
export default db;