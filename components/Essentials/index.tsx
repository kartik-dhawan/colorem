import { Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useSelector } from "react-redux"
import { RootType } from "../../redux/constants/stateTypes"
import { EssentialItemsType } from "../../utils/interfaces"
import { styles } from "./styles"

const Essentials = () => {
  const eid = "essentialsSection"
  const content = useSelector((state: RootType) => state.contentSlice.data)

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
        The Essentials
      </Typography>
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
