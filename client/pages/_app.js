import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';
import { AppProvider, useAppContext } from '../contexts/AppContext';
import MintForm from '../components/MintForm';
import TransferForm from '../components/TransferForm';
import MintTokens from '../scripts/MintTokens';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = 'ethereum';
const clientid = require("../keys.json")["client-id"];

function MyApp({ Component, pageProps }) {
	return (
		<ThirdwebProvider activeChain={activeChain} clientId={clientid}>
			<AppProvider>
				<Component {...pageProps} />
				<MintForm onMint={(data) => MintTokens(data)} />	
				<TransferForm transferTokens={(tFormData) => console.log('Transferring tokens with:', tFormData)} />
			</AppProvider>
    	</ThirdwebProvider>
	);
}

export default MyApp;
