export const styles = {
  paletteSectionHeaderWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px 6px",
  },
  paletteSectionNextBtn: {
    color: "#d9d9d9", // $text_primary
    fontSize: "20px",
    fontWeight: 300,
    borderRadius: "0px",
    padding: "2px 7px 2px 16px",
  },
  paletteSectionBarsWrapper: {
    display: "flex",
    flexDirection: "row",
    height: "85%",
    minHeight: "500px",
  },
  paletteSectionBar: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  paletteSectionBarNumber: {
    margin: "20px 0px",
    fontSize: {
      md: "70px",
    },
  },
  paletteSectionBarColorText: {
    fontSize: {
      md: "22px",
      xl: "24px",
    },
    fontWeight: 300,
  },
  paletteSectionBarColorBallsWrapper: {
    display: "flex",
    margin: "10px 0px 20px 0px",
    gap: "20px",
  },
  paletteSectionBarColorBall: {
    height: "30px",
    width: "30px",
    borderRadius: "50%",
    margin: "5px 0px 10px 0px",
  },
  paletteSectionBarBgBall: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  paletteSectionBarTextBall: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  paletteSectionBarColorReference: {
    fontSize: "12px",
  },
  paletteSectionTitle: {
    color: "#d9d9d9", // $text_primary
    textTransform: "capitalize",
    fontSize: "20px",
    fontWeight: 300,
  },
}
