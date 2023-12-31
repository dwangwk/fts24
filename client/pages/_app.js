import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';
import { AppProvider } from '../contexts/AppContext';
import MintForm from '../components/MintForm';
import TransferForm from '../components/TransferForm';

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = 'ethereum';

function MyApp({ Component, pageProps }) {
	return (
		<ThirdwebProvider activeChain={activeChain}>
			<AppProvider>
				<Component {...pageProps} />
				<MintForm onMint={(formData) => console.log('Minting tokens with:', formData)} />	
				<TransferForm transferTokens={(tFormData) => console.log('Transferring tokens with:', tFormData)} />
			</AppProvider>
    	</ThirdwebProvider>
	);
}

export default MyApp;
