import type { AppProps } from "next/app"
import "../styles/index.scss"
import Layout from "../components/common/Layout"
import Router, { useRouter } from "next/router"
import store from "../redux/store"
import { Provider } from "react-redux"
import { useState } from "react"
import { LinearProgress } from "@mui/material"
import Head from "next/head"
import Script from "next/script"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const noLayoutPages = ["/_error", "/", "/404", "/about", "/login", "/recover"]

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
        <Head>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.G_TAG_CODE}`}
          />
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.G_TAG_CODE}');
            `}
          </Script>
        </Head>
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
