import { Box } from "@mui/material"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import GradientSection from "../../components/GradientSection"
import { updateContent } from "../../redux/slices/contentSlice"
import { client } from "../../utils/contentful/config"
import { ContentfulType } from "../../utils/interfaces"

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
const Gradients = ({ contentData }: ContentfulType) => {
  const dispatch = useDispatch()

  useEffect(() => {
    // storing contentful data in redux for this page
    dispatch(updateContent(contentData))
  }, [contentData])

  return (
    <Box>
      <GradientSection />
    </Box>
  )
}

export default Gradients