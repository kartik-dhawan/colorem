import { Yellowtail } from "@next/font/google"
import Head from "next/head"
import Link from "next/link"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateContent } from "../redux/slices/contentSlice"
import { client } from "../utils/contentful/config"
import { ContentfulType } from "../utils/interfaces"

const yellowTail = Yellowtail({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

/**
 *
 * css in index.scss file
 */

export const getStaticProps = async () => {
  const contentResponse = await client.getEntries({
    content_type: "coloremDashboard", // eslint-disable-line
  })

  return {
    props: {
      contentData: contentResponse?.items[0]?.fields,
    },
    revalidate: parseInt(process.env.ISR_REVAL_TIME_DASHBOARD || "10"), // In seconds
  }
}

const Home = ({ contentData }: ContentfulType) => {
  const dispatch = useDispatch()
  useEffect(() => {
    // storing contentful data in redux for this page
    dispatch(updateContent(contentData))
  })

  const title = "Colorem"
  const description = "Permutations with colors & more."

  return (
    <div className="indexWrapper">
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
          content={"https:" + contentData.defaultMetaImage?.fields.file.url}
        />
        <meta property="og:site_name" content="colorem.vercel.app" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={"https:" + contentData.defaultMetaImage?.fields.file.url}
        />
      </Head>
      <main className="indexMain">
        <Link
          href="/dashboard"
          className={"indexHeader " + yellowTail.className}
        >
          Colorem
        </Link>
        <Link href="/dashboard" className="indexLink">
          Start creating
        </Link>
      </main>
    </div>
  )
}

export default Home
