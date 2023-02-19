import { Box, Button, Grid, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"
import { RootType } from "../../redux/constants/stateTypes"
import { ContentfulType } from "../../utils/interfaces"
import { styles } from "./styles/styles"

const TeamDetails = () => {
  const content: ContentfulType = useSelector(
    (state: RootType) => state.contentSlice.data
  )
  const members = content.teamMembers
  const tid = "teamSection"

  return (
    <Grid
      item
      md={7}
      xs={12}
      order={{ md: 2, xs: 1 }}
      className={tid + "Wrapper"}
      id={tid + "Wrapper"}
    >
      <Box
        className={tid + "Head"}
        id={tid + "Head"}
        sx={{
          display: "flex",
          alignItems: "center",
          margin: "0px 0px 25px 0px",
        }}
      >
        <Link href="/about/team" className={tid + "Title"} id={tid + "Title"}>
          <Button variant="contained" sx={styles.teamSectionTitle}>
            TEAM
          </Button>
        </Link>

        <Box
          className={tid + "AvatarWrapper"}
          id={tid + "AvatarWrapper"}
          sx={styles.teamSectionAvatarWrapper}
        >
          {members?.map((avi: any, i: number) /* eslint-disable-line */ => {
            return (
              <Image
                key={i}
                src={`https:${avi.fields?.file.url}`}
                alt={avi.name + " Avatar"}
                height={60}
                width={60}
                className={tid + "Avatar"}
                id={tid + "Avatar_" + i}
              />
            )
          })}
        </Box>
      </Box>
      <Typography
        variant="body2"
        className={tid + "Body"}
        id={tid + "Body"}
        sx={styles.teamSectionBody} // ellipsis css in .scss file
      >
        {content?.teamSectionBody}
      </Typography>
    </Grid>
  )
}

export default TeamDetails
