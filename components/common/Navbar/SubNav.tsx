import { Button, Grid } from "@mui/material"
import { styles } from ".././styles"

const SubNav = () => {
  const snid = "subNav"

  return (
    <Grid
      container
      sx={{
        ...styles.nav,
        margin: "25px 0px",
      }}
      className={snid + "Wrapper"}
      id={snid + "Wrapper"}
    >
      <Grid
        item
        xs={6}
        sm={4}
        className={snid + "Title"}
        id={snid + "Title"}
        sx={styles.subNavTitle}
      >
        Permutations<br></br>with colors<br></br>and more.
      </Grid>
      <Grid
        item
        xs={6}
        sm={4}
        textAlign={"right"}
        sx={{ color: "#ebe1e1" }} // text_third
        className={snid + "ChooseTheme"}
        id={snid + "ChooseTheme"}
      >
        Theme
      </Grid>
      <Grid item xs={0} sm={4} textAlign={"right"}>
        <Button
          variant="contained"
          className={snid + "GetStartBtn"}
          id={snid + "GetStartBtn"}
          sx={styles.subNavButton}
        >
          Get Started
        </Button>
      </Grid>
    </Grid>
  )
}

export default SubNav
