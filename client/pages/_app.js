import '../styles/globals.css'; // Import your global CSS file here

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

function MyApp({ Component, pageProps }) {
	return (<Component {...pageProps}/>);
}

export default MyApp;
