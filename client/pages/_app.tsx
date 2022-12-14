import type { AppProps } from "next/app";
import { wrapper } from "../features/store";
import { Provider } from "react-redux";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, ...rest }: AppProps) {
  console.log(wrapper);
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Head>
        <title>Azusa Nakahashi Portfolio</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
