import ConvertForm from '../../components/Forms/ConvertForm';
import styles from "../../styles/Forms.module.css";
import convertTokens from "../../scripts/convertTokens"
import { AppProvider } from '../../contexts/AppContext';
import Navbar from "../../components/navigation/Navbar";

const Convert = () => {
  return (
    <AppProvider>
			<Navbar></Navbar>
        <main className={styles.main}>
          <div className={styles.container}>
              <div className={styles.title}>
                Convert ECO tokens
              </div>
              <div className={styles.container_lower}>
                <ConvertForm onTransfer={(data) => {console.log("im here!"); convertTokens(data);}} />
              </div>
            </div>
        </main>
			</AppProvider>);
}

export default Convert;