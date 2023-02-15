import { Box } from "@mui/material"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import AboutLayout from "../../components/common/AboutLayout"
import { updateAboutPageContent } from "../../redux/slices/contentSlice"
import { client } from "../../utils/contentful/config"
import { AboutNavItem, ContentfulType } from "../../utils/interfaces"

/**
 *
 * figure out a way to keep the side nav in all pages &
 * make the route change for every selected listitem
 */

export const getStaticProps = async () => {
  const { items } = await client.getEntries({
    content_type: "coloremAbout",
  })
  const navItems: AboutNavItem[] = [...items].reverse().map((item: any) => {
    return {
      id: item.fields.id,
      title: item.fields.navItemTitle,
      route: item.fields.navItemRoute,
    }
  })

  return {
    props: {
      navItems,
    },
    revalidate: parseInt(process.env.ISR_REVAL_TIME_DASHBOARD || "10"), // In seconds
  }
}

const AboutPage = ({ navItems }: ContentfulType) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateAboutPageContent(navItems))
  }, [navItems])

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
