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
    height: "85%",
    minHeight: "500px",
    flexDirection: {
      xs: "column",
      md: "row",
    },
  },
  paletteSectionBar: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: {
      xs: "row",
      md: "column",
    },
    justifyContent: "space-between",
  },
  paletteSectionBarContentWrapper: {
    flex: {
      xs: 1,
      md: 0,
    },
    margin: {
      xs: "13px 5px 8px 25px",
      sm: "25px 50px 15px 50px",
      md: "0px",
    },
  },
  paletteSectionBarNumber: {
    margin: {
      xs: "20px 0px 20px 5px",
      sm: "20px 0px 20px 10px",
      md: "20px 0px",
    },
    fontSize: {
      xs: "45px",
      sm: "65px",
      md: "70px",
    },
  },
  paletteSectionBarColorText: {
    fontSize: {
      md: "22px",
      xl: "24px",
    },
    fontWeight: 300,
    display: {
      xs: "flex",
      md: "inline",
    },
    width: "100%",
    flexWrap: "wrap",
  },
  paletteBarFirstColorName: {
    fontSize: {
      sm: "21px",
      lg: "25px",
    },
  },
  paletteBarSecondColorName: {
    display: "flex",
    alignItems: "center",
    fontSize: {
      sm: "21px",
      lg: "20px",
    },
  },
  paletteSectionBarDivider: {
    margin: {
      xs: "10px 0px 10px 0px",
      md: "15px 0px 45px 0px",
      lg: "15px 0px 65px 0px",
    },
  },
  paletteSectionBarColorBallsWrapper: {
    display: "flex",
    margin: "10px 0px 20px 0px",
    gap: {
      md: "10px",
      lg: "20px",
    },
    flexDirection: {
      xs: "row",
      md: "column",
      lg: "row",
    },
  },
  paletteSectionBarColorBall: {
    height: {
      xs: "26px",
      lg: "30px",
    },
    width: {
      xs: "26px",
      lg: "30px",
    },
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
