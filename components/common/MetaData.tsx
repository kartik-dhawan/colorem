import Head from "next/head"

interface MetaProps {
  title: string
  description: string
}

const MetaData = ({ title, description }: MetaProps) => {
  return (
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
          typeof window !== "undefined"
            ? `${window.location.origin}/images/homeMetaImage.webp`
            : "/images/og.webp"
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
          typeof window !== "undefined"
            ? `${window.location.origin}/images/homeMetaImage.webp`
            : "/images/og.webp"
        }
      />
    </Head>
  )
}

export default MetaData
