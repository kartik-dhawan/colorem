import { Box, Typography } from "@mui/material"
import GitHubIcon from "@mui/icons-material/GitHub"
import InstagramIcon from "@mui/icons-material/Instagram"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import Link from "next/link"
import { styles } from "./styles"

const Footer = () => {
  const frid = "footerBox"
  let mapId = 0
  const references = [
    {
      title: "Halo Lab",
      source:
        "https://dribbble.com/shots/18365166-Web-site-design-landing-page-home-page-ui",
      sourceName: "Dribbble",
      type: "UI/UX Design",
    },
    {
      title: "Coolers",
      source: "https://coolors.co/",
      sourceName: "Coolers",
      type: "Web Application",
    },
    {
      title: "Colormind",
      source: "http://colormind.io/api-access/",
      sourceName: "Colormind API",
      type: "API",
    },
  ]

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
        <GitHubIcon sx={styles.footerBoxIcon} />
        <InstagramIcon sx={styles.footerBoxIcon} />
        <LinkedInIcon sx={styles.footerBoxIcon} />
      </Box>
      <Typography
        variant="body1"
        className={frid + "Body"}
        id={frid + "Body"}
        sx={styles.footerBoxBody}
      >
        Coded & developed completely by{" "}
        <Link href="/">
          <u>Kartik Dhawan</u>
        </Link>
        <br></br>
        This web app is only made as a project and in complete reference to the
        following resourses...
      </Typography>
      <Box
        className={frid + "ReferenceWrapper"}
        id={frid + "ReferenceWrapper"}
        sx={styles.footerBoxReferenceWrapper}
      >
        {references.map((item) => {
          mapId++
          return (
            <Box
              className={frid + "Reference"}
              id={frid + "Reference_" + mapId}
              sx={styles.footerBoxReference}
              key={mapId}
            >
              <Link href={item.source} className={"refLink"}>
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
