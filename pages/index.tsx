import { Yellowtail } from "@next/font/google"
import Link from "next/link"
import MetaData from "../components/common/MetaData"

const yellowTail = Yellowtail({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

/**
 *
 * css in index.scss file
 */

const Home = () => {
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
