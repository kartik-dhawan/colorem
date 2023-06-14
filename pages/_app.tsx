import type { AppProps } from "next/app"
import "../styles/index.scss"
import Layout from "../components/common/Layout"
import Router, { useRouter } from "next/router"
import store from "../redux/store"
import { Provider } from "react-redux"
import { useState } from "react"
import { LinearProgress } from "@mui/material"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const noLayoutPages = ["/_error", "/", "/404", "/about", "/login"]

  const [routeLoading, setRouteLoading] = useState<boolean>(false)

  Router.events.on("routeChangeStart", () => {
    setRouteLoading(true)
  })
  Router.events.on("routeChangeComplete", () => {
    setRouteLoading(false)
  })
  Router.events.on("routeChangeError", () => {
    setRouteLoading(false)
  })

  if (
    noLayoutPages.includes(router.pathname) ||
    router.pathname.includes("/about")
  ) {
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  } else {
    return (
      <Provider store={store}>
        {routeLoading && <LinearProgress />}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    )
  }
}
