export const styles = {
  gradientInfoDrawer: {
    // position: "absolute",
    "& .MuiDrawer-paper": {
      width: {
        xs: "100vw",
        sm: "70vw",
        md: "80vw",
        lg: "70vw",
        xl: "60vw",
      },
      height: "100%",
      backgroundColor: "#111",
      color: "#d9d9d9",
      display: "flex",
      flexDirection: "column",
    },
  },
  infoDrawerDescWrapper: {
    display: "flex",
    flexDirection: {
      xs: "column",
      md: "row",
    },
    justifyContent: "center",
  },
  infoDrawerGradientBox: {
    minHeight: {
      xs: "250px",
      md: "300px",
    },
    minWidth: {
      xs: "80%",
      md: "300px",
    },
    // backgroundColor: "#444",
    margin: "3rem 2rem",
    flex: {
      xs: 1,
      md: 0,
    },
  },
  infoDrawerGradientDescription: {
    flex: {
      xs: 2,
      md: 1,
    },
    margin: {
      xs: "0rem 1rem",
      md: "3rem 1rem",
    },
  },
  infoDrawerGradientDescConstant: {
    fontWeight: 300,
    textTransform: "uppercase",
    letterSpacing: "2px",
    display: {
      xs: "none",
      md: "inline-block",
    },
    opacity: 0.8,
  },
  infoDrawerGradientName: {
    fontWeight: 300,
    fontSize: {
      xs: "40px",
      sm: "45px",
      md: "75px",
      lg: "100px",
      xl: "110px",
    },
    color: "#d9d9d9",
    textAlign: {
      xs: "center",
      md: "left",
    },
    padding: {
      xs: "3px 0px",
      md: "10px 0px",
    },
  },
  infoDrawerGradientColorsName: {
    wordWrap: "break-word",
    fontWeight: 200,
    color: "#d9d9d9",
    fontSize: {
      xs: "16px",
      sm: "22px",
      md: "28px",
    },
    textAlign: {
      xs: "center",
      md: "left",
    },
    letterSpacing: {
      xs: "0.7px",
      sm: "0.4px",
    },
  },
}
