import { Box, Typography } from "@mui/material"
import Image from "next/image"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateContent } from "../redux/slices/contentSlice"
import { client } from "../utils/contentful/config"
import { ContentfulType } from "../utils/interfaces"
import { styles } from "../styles/common/customErrorPage"
import Link from "next/link"
import WestIcon from "@mui/icons-material/West"

export const getStaticProps = async () => {
  const response = await client.getEntries({ content_type: "coloremDashboard" }) // eslint-disable-line

  return {
    props: {
      content: response?.items[0]?.fields,
    },
    revalidate: parseInt(process.env.ISR_REVAL_TIME_DASHBOARD || "10"), // In seconds
  }
}

const Custom404 = ({ content }: ContentfulType) => {
  const c4id = "custom404"
  const { customErrorPagesData } = content

  const dispatch = useDispatch()

  useEffect(() => {
    /**
     * updates only the error pages data from contentful and stores in redux store
     */
    dispatch(updateContent({ ...content?.customErrorPagesData }))
  }, [content])

  return (
    <Box
      className={c4id + "Wrapper"}
      id={c4id + "Wrapper"}
      sx={styles.customErrorPageWrapper}
    >
      <Typography
        variant="h1"
        id={c4id + "Head"}
        sx={styles.customErrorPageHead}
      >
        4
        <Box sx={styles.customErrorPageCatIcon}>
          <Image
            src="/images/catIcon.png"
            alt={"Cat Icon"}
            width={80}
            height={80}
            color={"white"}
          ></Image>
        </Box>
        4
      </Typography>
      <Typography
        variant="subtitle1"
        className={c4id + "BodyText"}
        id={c4id + "BodyText"}
        sx={styles.customErrorPageBodyText}
      >
        {customErrorPagesData[404]?.statusTitle}{" "}
        {customErrorPagesData[404]?.statusBody}
      </Typography>
      <Typography
        className={c4id + "RedirectWrapper"}
        id={c4id + "RedirectWrapper"}
        sx={styles.customErrorPageRedirectWrapper}
      >
        <Link href={"/dashboard"}>
          <WestIcon />
          {customErrorPagesData?.redirectBtnText}
        </Link>
      </Typography>
    </Box>
  )
}

export default Custom404
