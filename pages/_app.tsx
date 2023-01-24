import type { AppProps } from "next/app"
import "../styles/index.scss"
import Layout from "../components/common/Layout"
import { useRouter } from "next/router"
import store from "../redux/store"
import { Provider } from "react-redux"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  if (
    router.pathname === "/_error" ||
    router.pathname === "/" ||
    router.pathname === "/404"
  ) {
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  } else {
    return (
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    )
  }
}
