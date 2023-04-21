import { Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Roboto_Condensed } from "next/font/google"
import { useSelector } from "react-redux"
import { RootType } from "../../redux/constants/stateTypes"
import { EssentialItemsType } from "../../utils/interfaces"
import { styles } from "./styles"

const roboto = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  display: "swap",
})

const Essentials = () => {
  const eid = "essentialsSection"
  const content = useSelector((state: RootType) => state.contentSlice.data)

  return (
    <Box
      className={eid + "Wrapper"}
      id={eid + "Wrapper"}
      data-testid={eid + "Wrapper"}
      sx={styles.essentialsSectionWrapper}
    >
      <Box
        className={eid + "Title " + roboto.className}
        id={eid + "Title"}
        sx={styles.essentialsSectionTitle}
      >
        The Essentials
      </Box>
      <Grid container className={eid + "Body"} id={eid + "Body"}>
        {content.essentialItemsText?.map((item: EssentialItemsType) => {
          return (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              className={eid + "BodyItem"}
              id={eid + "BodyItem_" + item.id}
              sx={styles.essentialsSectionBodyItem}
              key={item.id}
            >
              <Typography variant="h2" sx={styles.essentialsItemTitle}>
                {item.id}
              </Typography>
              <Typography variant="body2" sx={styles.essentialsItemBody}>
                {item.body}
              </Typography>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default Essentials
