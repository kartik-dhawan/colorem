import { Box } from "@mui/material"
import SubNav from "../../components/common/Navbar/SubNav"
import FileSection from "../../components/FileSection"
import Essentials from "../../components/Essentials"
import FeedbackAndTeam from "../../components/FeedbackAndTeam"
import { client } from "../../utils/contentful/config"
import { ContentfulType } from "../../utils/interfaces"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateContent } from "../../redux/slices/contentSlice"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback, {
  myErrorHandler,
} from "../../components/common/ErrorFallback"
import { Roboto } from "@next/font/google"

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps = async () => {
  const response = await client.getEntries({ content_type: "coloremDashboard" }) // eslint-disable-line

  return {
    props: {
      data: response?.items[0]?.fields,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10 || parseInt(process.env.ISR_REVAL_TIME_DASHBOARD || "10"), // In seconds
  }
}

const roboto = Roboto({ weight: "400", display: "swap", subsets: ["latin"] })

const Dashboard = ({ data }: ContentfulType) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateContent(data))
  }, [data])

  return (
    <Box className={roboto.className}>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
        <SubNav content={data} />
        <FileSection />
        <FeedbackAndTeam />
        <Essentials />
      </ErrorBoundary>
    </Box>
  )
}

export default Dashboard
