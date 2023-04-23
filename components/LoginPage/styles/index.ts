export const styles = {
  loginPageWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "34px",
    border: "0.5px solid #727272",
    position: "absolute",
    top: "2rem",
    bottom: "2rem",
    left: "1.5rem",
    right: "1.5rem",
    padding: {
      xs: "0rem 2rem",
      md: "0rem 4rem",
    },
  },
  loginPageFormWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: {
      xs: "16px",
      sm: "32px",
      lg: "48px",
    },
    alignItems: {
      xs: "center",
      sm: "flex-end",
    },
    flexDirection: {
      xs: "column",
      sm: "row",
    },
  },
  loginPageTextField: {
    width: {
      xs: "100%",
      sm: "40%",
      md: "25%",
      lg: "20%",
    },
    "& > .MuiFormLabel-root": {
      color: "#d9d9d9",
      fontWeight: 300,
      fontSize: "18px",
      "&.Mui-focussed": {
        color: "#727272 !important",
      },
      // "&.css-1c2i806-MuiFormLabel-root-MuiInputlabel-root.Mui-focused": {
      //   color: "#727272 !important",
      // },
    },
    "& > .MuiInputBase-root": {
      padding: "2px 8px",
      fontWeight: 300,
      fontSize: "18px",
      "&::before": {
        borderBottom: "0.5px solid #d9d9d9 !important",
      },
      "&::after": {
        borderBottom: "1px solid #d9d9d9 !important",
      },
      color: "#d9d9d9",
    },
  },
  loginPageButton: {
    height: "40px",
    color: "#222",
    padding: "16px 24px",
    width: {
      xs: "100%",
      sm: "40%",
      md: "30%",
    },
    backgroundColor: "#727272",
    borderRadius: "0px",
    marginTop: {
      xs: "1rem",
      sm: "0px",
    },
    "&:hover": {
      backgroundColor: "#b1b1b1",
    },
  },
  loginPageExtraOptions: {
    display: "flex",
    fontSize: "14px",
    justifyContent: {
      xs: "center",
      sm: "flex-start",
    },
  },
  loginPageExtraOptionsButton: {
    textTransform: "lowercase",
    fontWeight: 300,
    color: "#727272",
    transition: "500ms all ease",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#b1b1b1",
    },
  },
}
