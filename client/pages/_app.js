import Navbar from "../components/navigation/Navbar";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

function MyApp({ Component, pageProps }) {
	return (
		<div>
			<Navbar></Navbar>
			<Component {...pageProps}/>
		</div>);
}

export default MyApp;
