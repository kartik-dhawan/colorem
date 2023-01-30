import Head from "next/head"
import { Yellowtail } from "@next/font/google"
import Link from "next/link"

const yellowTail = Yellowtail({ weight: "400", subsets: ["latin"] })

/**
 *
 * css in index.scss file
 */

const Home = () => {
  return (
    <div className="indexWrapper">
      <Head>
        <title>Colorem</title>
        <meta name="description" content="The permutations of colors." />
        <link rel="icon" href="/favicon.ico" />
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
