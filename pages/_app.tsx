import '../styles/globals.css'
import type { AppProps } from 'next/app'
import styles from '../styles/App.module.css';

function MyApp({ Component, pageProps }: AppProps) {
 
  	return (
		<div className={styles.wrapper}>
			<Component {...pageProps} />
		</div>
	)
}

export default MyApp
