import { Box } from "@mui/material"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import AboutLayout from "../../components/common/AboutLayout"
import { updateContent } from "../../redux/slices/contentSlice"
import { client } from "../../utils/contentful/config"
import { ContentfulType } from "../../utils/interfaces"

/**
 *
 * figure out a way to keep the side nav in all pages &
 * make the route change for every selected listitem
 */

export const getStaticProps = async () => {
  const response = await client.getEntries({
    content_type: "coloremDashboard",
  })
  return {
    props: {
      contentData: response?.items[0]?.fields,
    },
    revalidate: parseInt(process.env.ISR_REVAL_TIME_DASHBOARD || "10"), // In seconds
  }
}

const AboutPage = ({ contentData }: ContentfulType) => {
  const dispatch = useDispatch()

  useEffect(() => {
    // storing contentful data in redux for this page
    dispatch(updateContent(contentData))
  }, [contentData])

  return (
    <AboutLayout>
      {/* the content component will come here */}
      {/* add {flex: 1} css property inside the wrapper of content section once you remove this box */}
      <Box
        sx={{
          flex: {
            md: 0,
            lg: 1,
          },
        }}
      ></Box>
    </AboutLayout>
  )
}

export default AboutPage
