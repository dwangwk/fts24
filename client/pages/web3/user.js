import { ThirdwebProvider } from "@thirdweb-dev/react"
import { AppProvider } from '../../contexts/AppContext';
import Navbar from "../../components/navigation/Navbar";
import styles from "../../styles/user.module.css";
import UserHoldings from "../../components/UserHoldings";
import { getAuth } from "firebase/auth";
import MicroFinance from "../../components/MicroFinance";
import ExecuteForm from '../../components/ExecuteForm';
import Card from "../../components/Card";


const activeChain = 'ethereum';
const clientid = require("./keys.json")["client-id"];

const UserProfile = () => {
    const user = getAuth().currentUser;
    return (
        <ThirdwebProvider activeChain={activeChain} clientId={clientid}>
            <AppProvider>
                <Navbar></Navbar>
                <div className={styles.fullpage}>
                    <div>
                        <div className={styles.infobox}>
                            <h1 className={styles.title}>My Profile</h1>
                            <p><b>Username :</b> {user.displayName}</p>
                            <p><b>Email :</b> {user.email}</p>
                        </div>
                        <div className={styles.holdingbox}>
                            <div className={styles.titlebox}>
                                <h1 className={styles.title_}>My Holdings</h1>
                            </div>
                            <div>
                                <UserHoldings></UserHoldings>
                            </div>
                        </div>
                    </div>
                    <div className={styles.executemain}>
                        <h1 className={styles.title_}>Execute Tokens</h1>
                        <div className={styles.executebox}>
                            <ExecuteForm></ExecuteForm>
                        </div>
                    </div>
                </div>
                    <MicroFinance></MicroFinance>
            </AppProvider>
        </ThirdwebProvider>
    )
}

export default UserProfile;