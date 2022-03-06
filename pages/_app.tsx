import Head from 'next/head';
import { MessageProvider } from '../components/provider';
import '../styles/globals.less';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Online Education</title>
        <meta key="description" name="description" content="Online Education System" />
      </Head>
      <MessageProvider>
        <Component {...pageProps} />
      </MessageProvider>
    </>
  );
}

export default MyApp;

