import type { AppProps } from "next/app";
import "../styles/index.scss";
import Layout from "../components/common/Layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(router);

  if (router.pathname === "/_error" || router.pathname === "/") {
    return <Component {...pageProps} />;
  } else {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}
