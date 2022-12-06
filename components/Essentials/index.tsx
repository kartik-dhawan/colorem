import { Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { styles } from "./styles"

const Essentials = () => {
  const eid = "essentialsSection"

  return (
    <Box
      className={eid + "Wrapper"}
      id={eid + "Wrapper"}
      sx={styles.essentialsSectionWrapper}
    >
      <Typography
        variant="h2"
        className={eid + "Title"}
        id={eid + "Title"}
        sx={styles.essentialsSectionTitle}
      >
        Essentials to know
      </Typography>
      <Grid container className={eid + "Body"} id={eid + "Body"}>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          className={eid + "BodyItem"}
          id={eid + "BodyItem_1"}
          sx={styles.essentialsSectionBodyItem}
        >
          <Typography variant="h2" sx={styles.essentialsItemTitle}>
            1
          </Typography>
          <Typography variant="body2" sx={styles.essentialsItemBody}>
            Generate a random palette for your web design. Save it if you like
            it else hop on to the next.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          className={eid + "BodyItem"}
          id={eid + "BodyItem_2"}
          sx={styles.essentialsSectionBodyItem}
        >
          <Typography variant="h2" sx={styles.essentialsItemTitle}>
            2
          </Typography>
          <Typography variant="body2" sx={styles.essentialsItemBody}>
            Bored of browsing palettes? Make your own with a combination of your
            creativity and our dataset.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          className={eid + "BodyItem"}
          id={eid + "BodyItem_3"}
          sx={styles.essentialsSectionBodyItem}
        >
          <Typography variant="h2" sx={styles.essentialsItemTitle}>
            3
          </Typography>
          <Typography variant="body2" sx={styles.essentialsItemBody}>
            We have pre-built templates for color gradients; ready for you to
            use & make your website radiant.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Essentials
