import { Box, Button, Grid, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { styles } from "./styles/styles"

const TeamDetails = () => {
  const tid = "teamSection"

  const avatarObj = [
    {
      name: "Kartik Dhawan",
      src: "/user1.JPG",
    },
    {
      name: "Myrtle Wilson",
      src: "/user2.PNG",
    },
    {
      name: "Jules Dawn",
      src: "/user3.JPG",
    },
  ]

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
        <Link href="/" className={tid + "Title"} id={tid + "Title"}>
          <Button variant="contained" sx={styles.teamSectionTitle}>
            TEAM
          </Button>
        </Link>

        <Box
          className={tid + "AvatarWrapper"}
          id={tid + "AvatarWrapper"}
          sx={styles.teamSectionAvatarWrapper}
        >
          {avatarObj.map((avi, i: number) => {
            return (
              <Image
                key={i}
                src={`/images${avi.src}`}
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
        The super fast color palettes generator! Create the perfect color
        palette or get inspired by thousands of beautiful color schemes. Explore
        trending palettes now & start creating.
      </Typography>
    </Grid>
  )
}

export default TeamDetails
