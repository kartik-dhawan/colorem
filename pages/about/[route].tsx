import { Box } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import AboutLayout from "../../components/common/AboutLayout"
import { updateContent } from "../../redux/slices/contentSlice"
import { client } from "../../utils/contentful/config"
import { ContentfulType } from "../../utils/interfaces"

export const getStaticPaths = async () => {
  const { items } = await client.getEntries({
    content_type: "coloremAbout",
  })

  /**
   * create a path for every route
   * the key inside 'params' object should be equal to the file name
   * ex: if file name is [slug].tsx, the object should be params: {slug: ""}
   */
  const paths = items.map((item: any) => {
    return {
      params: {
        route: item.fields && item.fields.navItemRoute,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: any) => {
  const response = await client.getEntries({
    content_type: "coloremDashboard",
  })

  const { items } = await client.getEntries({
    content_type: "coloremAbout",
    "fields.navItemRoute": params?.route,
  })

  if (items.length === 0) {
    return {
      redirect: {
        destination: "/players",
        permanent: false,
      },
    }
  }

  return {
    props: {
      contentData: response?.items[0]?.fields,
      aboutItem: items[0],
    },
    revalidate: parseInt(process.env.ISR_REVAL_TIME_DASHBOARD || "10"), // In seconds
  }
}

const AboutItem = ({ contentData, aboutItem }: ContentfulType) => {
  const router = useRouter()
  const dispatch = useDispatch()

  console.log(aboutItem)

  useEffect(() => {
    // storing contentful data in redux for this page
    dispatch(updateContent(contentData))
  }, [contentData])

  return (
    <AboutLayout>
      <Box
        sx={{
          flex: {
            md: 0,
            lg: 1,
          },
        }}
      >
        {router.asPath}
      </Box>
    </AboutLayout>
  )
}

export default AboutItem
