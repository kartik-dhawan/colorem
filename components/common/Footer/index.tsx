import { Box, Typography } from "@mui/material"
import GitHubIcon from "@mui/icons-material/GitHub"
import InstagramIcon from "@mui/icons-material/Instagram"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import Link from "next/link"
import { styles } from "./styles"
import { externalLinks } from "../../../utils/constants"
import { useSelector } from "react-redux"
import { RootType } from "../../../redux/constants/stateTypes"

const Footer = () => {
  const frid = "footerBox"
  let mapId = 0

  const content = useSelector((state: RootType) => state.contentSlice.data)
  return (
    <Box
      className={frid + "Wrapper"}
      id={frid + "Wrapper"}
      sx={styles.footerBoxWrapper}
    >
      <Box
        className={frid + "IconsWrapper"}
        id={frid + "IconsWrapper"}
        sx={{
          padding: "20px 0px",
        }}
      >
        <Link href={externalLinks.GITHUB} target="_blank">
          <GitHubIcon sx={styles.footerBoxIcon} />
        </Link>
        <Link href={externalLinks.INSTAGRAM} target="_blank">
          <InstagramIcon sx={styles.footerBoxIcon} />
        </Link>
        <Link href={externalLinks.LINKEDIN} target="_blank">
          <LinkedInIcon sx={styles.footerBoxIcon} />
        </Link>
      </Box>
      <Typography
        variant="body1"
        className={frid + "Body"}
        id={frid + "Body"}
        sx={styles.footerBoxBody}
      >
        {content.footerDevelopedByText}{" "}
        <Link href="/about">
          <u>{content.developedBy}</u>
        </Link>
        <br></br>
        {content.footerReferenceText}
      </Typography>
      <Box
        className={frid + "ReferenceWrapper"}
        id={frid + "ReferenceWrapper"}
        sx={styles.footerBoxReferenceWrapper}
      >
        {content.references?.map((item: any) => {
          mapId++
          return (
            <Box
              className={frid + "Reference"}
              id={frid + "Reference_" + mapId}
              sx={styles.footerBoxReference}
              key={mapId}
            >
              <Link href={item.source} target="_blank" className={"refLink"}>
                {item.title}
              </Link>
              {mapId < 3 && <span>|</span>}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default Footer
