import { Html, Head, Main, NextScript } from "next/document"
import Script from "next/script"

export default function Document() {
  console.log(process.env.G_TAG_CODE)

  return (
    <Html>
      <Head>
        <link rel="shortcut icon" href="/favicon/favicon.ico"></link>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-5GPR2DHY6G`} // eslint-disable-line
        />
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-5GPR2DHY6G');
            `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
