import { Box } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import AboutLayout from "../../components/common/AboutLayout"
import {
  updateAboutPageContent,
  updateContent,
} from "../../redux/slices/contentSlice"
import { client } from "../../utils/contentful/config"
import { AboutNavItem, ContentfulType } from "../../utils/interfaces"

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
  const contentData = await client.getEntries({
    content_type: "coloremDashboard",
  })

  // current page content
  const currentPage = await client.getEntries({
    content_type: "coloremAbout",
    "fields.navItemRoute": params?.route,
  })

  // fetches all items
  const { items } = await client.getEntries({
    content_type: "coloremAbout",
  })

  // converts the fetched items into usable object
  const navItems: AboutNavItem[] = [...items].reverse().map((item: any) => {
    return {
      id: item.fields.id,
      title: item.fields.navItemTitle,
      route: item.fields.navItemRoute,
    }
  })

  if (currentPage.items.length === 0) {
    return {
      redirect: {
        destination: "/players",
        permanent: false,
      },
    }
  }

  return {
    props: {
      contentData: contentData?.items[0]?.fields,
      navItems,
      aboutItem: items[0].fields,
    },
    revalidate: parseInt(process.env.ISR_REVAL_TIME_DASHBOARD || "10"), // In seconds
  }
}

const AboutItem = ({ navItems, contentData }: ContentfulType) => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    // storing contentful data in redux for this page
    dispatch(updateAboutPageContent(navItems))
    dispatch(updateContent(contentData))
  }, [navItems])

  return (
    <AboutLayout>
      <Box
        sx={{
          flex: {
            xs: 0,
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
