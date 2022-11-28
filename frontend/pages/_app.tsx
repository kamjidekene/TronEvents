import { Layout } from "@layouts";
import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { default as NextHead } from "next/head";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import type { AppProps } from "next/app";
import "../styles/globals.scss";

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      alchemyId: "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "TronEvents App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({ ...darkTheme.accentColors.purple })}
      >
        <NextHead>
          <base href="/" />
          <meta charSet="utf-8" />
          <title>TronEvents - Tron powered event app</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover"
          />
        </NextHead>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
