import Head from "next/head"
import RecoverPassword from "../../components/RecoverAccount"

const Recover = () => {
  const title = "Recover Account"
  const description = "Reset or change your password for the app."
  return (
    <>
      <Head>
        {/* Primary meta tags */}
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        {/* Open Graph / Facebook */}
        <meta
          property="og:url"
          content={typeof window !== "undefined" ? window.location.href : ""}
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={
            "https://images.ctfassets.net/1v98waf66sfj/3AZSHDIcX2l5wtugFxRmWn/0d56e19f5f34ca6dd7a1ff453cefdcf4/homeMetaImage.webp"
          }
        />
        <meta property="og:site_name" content="colorem.vercel.app" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={
            "https://images.ctfassets.net/1v98waf66sfj/3AZSHDIcX2l5wtugFxRmWn/0d56e19f5f34ca6dd7a1ff453cefdcf4/homeMetaImage.webp"
          }
        />
      </Head>
      <RecoverPassword />
    </>
  )
}

export default Recover
