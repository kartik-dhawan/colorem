import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useDispatch } from "react-redux"
import AboutPageContent from "../../components/AboutPageContent"
import BehindTheDesk from "../../components/AboutPageContent/BehindTheDesk"
import ColoremTeam from "../../components/AboutPageContent/ColoremTeam"
import ProjectInsights from "../../components/AboutPageContent/ProjectInsights"
import AboutLayout from "../../components/common/AboutLayout"
import ErrorFallback, {
  myErrorHandler,
} from "../../components/common/ErrorFallback"
import {
  updateAboutPageContent,
  updateContent,
  updateCurrentAboutPageContent,
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
  const navItems: AboutNavItem[] = [...items]
    .reverse()
    .map((item: any) => {
      return {
        id: item.fields.id,
        title: item.fields.navItemTitle,
        route: item.fields.navItemRoute,
        content: item.fields.navItemContent ? item.fields.navItemContent : "",
      }
    })
    .sort((a, b) => (a.id > b.id ? 1 : -1))

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
  const dispatch = useDispatch()
  const router = useRouter()

  const navItemSelected = router.query.route

  /**
   * scrolls to the content page on first render in tablet & mobile view
   */

  const innerWidth = typeof window !== "undefined" && window.innerWidth
  useEffect(() => {
    const contentElement = document.querySelector("#aboutPageContentWrapper")
    if (innerWidth < 1200) {
      setTimeout(() => {
        contentElement?.scrollIntoView({ behavior: "smooth" })
      }, 500)
    }
  }, [navItemSelected])

  useEffect(() => {
    // storing contentful data in redux for this page
    dispatch(updateAboutPageContent(navItems))
    dispatch(updateContent(contentData))
  }, [navItems])

  useEffect(() => {
    navItems.forEach((element: any) => {
      if (element.route === navItemSelected) {
        dispatch(updateCurrentAboutPageContent(element))
      }
    })
  }, [navItems, navItemSelected])

  const title = "Colorem"
  const description = "Learn more about the project Colorem."

  return (
    <AboutLayout>
      <Head>
        {/* Primary meta tags */}
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        {/* Open Graph / Facebook */}
        <meta
          property="og:url"
          content={typeof window !== "undefined" ? window.location.href : ""}
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={"https:" + contentData.defaultMetaImage?.fields.file.url}
        />
        <meta property="og:site_name" content="colorem.vercel.app" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={"https:" + contentData.defaultMetaImage?.fields.file.url}
        />
      </Head>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
        {navItemSelected === "team" && <ColoremTeam />}
        {navItemSelected === "developer" && <BehindTheDesk />}
        {navItemSelected === "project" && <ProjectInsights />}
        {navItemSelected !== "team" &&
          navItemSelected !== "developer" &&
          navItemSelected !== "project" && (
            <AboutPageContent>
              <div>Content to be published in contentful.</div>
            </AboutPageContent>
          )}
      </ErrorBoundary>
    </AboutLayout>
  )
}

export default AboutItem
