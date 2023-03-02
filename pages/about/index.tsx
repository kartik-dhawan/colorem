import { Box } from "@mui/material"
import { useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useDispatch } from "react-redux"
import AboutLayout from "../../components/common/AboutLayout"
import ErrorFallback, {
  myErrorHandler,
} from "../../components/common/ErrorFallback"
import MetaData from "../../components/common/MetaData"
import {
  updateAboutPageContent,
  updateContent,
} from "../../redux/slices/contentSlice"
import { client } from "../../utils/contentful/config"
import { AboutNavItem, ContentfulType } from "../../utils/interfaces"

/**
 *
 * figure out a way to keep the side nav in all pages &
 * make the route change for every selected listitem
 */

export const getStaticProps = async () => {
  const contentData = await client.getEntries({
    content_type: "coloremDashboard",
  })

  const { items } = await client.getEntries({
    content_type: "coloremAbout",
  })

  const navItems: AboutNavItem[] = [...items]
    .map((item: any) => {
      return {
        id: item.fields.id,
        title: item.fields.navItemTitle,
        route: item.fields.navItemRoute,
        content: item.fields.navItemContent ? item.fields.navItemContent : "",
      }
    })
    .sort((a, b) => (a.id > b.id ? 1 : -1))

  return {
    props: {
      contentData: contentData?.items[0]?.fields,
      navItems,
    },
    revalidate: parseInt(process.env.ISR_REVAL_TIME_DASHBOARD || "10"), // In seconds
  }
}

const AboutPage = ({ navItems, contentData }: ContentfulType) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateContent(contentData))
    dispatch(updateAboutPageContent(navItems))
  }, [navItems])

  return (
    <AboutLayout>
      <MetaData
        title="Colorem"
        description="Learn more about the project Colorem."
      />
      {/* the content component will come here */}
      {/* add {flex: 1} css property inside the wrapper of content section once you remove this box */}
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
        <Box
          sx={{
            flex: {
              md: 0,
              lg: 1,
            },
          }}
        ></Box>
      </ErrorBoundary>
    </AboutLayout>
  )
}

export default AboutPage
