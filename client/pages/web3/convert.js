import ConvertForm from '../../components/ConvertForm';
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
              <p className={styles.text}>ECO needed for conversion: 0 (For now)</p>
              <div className={styles.container_lower}>
                <ConvertForm onTransfer={(data) => convertTokens(data)} />
              </div>
            </div>
        </main>
			</AppProvider>);
}

export default Convert;