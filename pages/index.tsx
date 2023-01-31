import { Yellowtail } from "@next/font/google"
import Link from "next/link"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import MetaData from "../components/common/MetaData"
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

  return (
    <div className="indexWrapper">
      <MetaData
        title="Colorem"
        description="Permutations with colors & more."
      />
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
