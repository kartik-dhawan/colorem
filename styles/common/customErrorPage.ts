export const styles = {
  customErrorPageWrapper: {
    minHeight: "100vh",
    maxHeight: "-webkit-fill-available",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  customErrorPageHead: {
    display: "flex",
    fontWeight: 200,
    fontSize: {
      xs: "100px",
      sm: "135px",
      md: "160px",
    },
    alignItems: "center",
  },
  customErrorPageCatIcon: {
    backgroundColor: "#d9d9d9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: {
      xs: "95px",
      sm: "135px",
      md: "160px",
    },
    height: {
      xs: "95px",
      sm: "135px",
      md: "160px",
    },
    margin: "0rem 25px",
    borderRadius: "1000px",
  },
  customErrorPageBodyText: {
    fontWeight: 200,
    fontSize: {
      xs: "18px",
      md: "21px",
      lg: "24px",
      xl: "27px",
    },
    letterSpacing: "0.6px",
    textAlign: "center",
    maxWidth: "80%",
    margin: "1rem 0rem",
  },
  customErrorPageRedirectWrapper: {
    fontWeight: 400,
    margin: "1rem",
    fontSize: {
      xs: "15px",
      sm: "16px",
      md: "17px",
      xl: "18px",
    },
    transition: "200ms all ease",
    backgroundColor: "#cf383890", // error_red
    "& > a": {
      display: "flex",
      alignItems: "center",
      color: "#bebebe",
      gap: {
        xs: "10px",
        md: "14px",
      },
      padding: {
        xs: "8px 14px 8px 11px",
        md: "10px 22px 10px 18px",
      },
      "& > svg": {
        transition: "200ms all ease",
        width: {
          xs: "16px",
          md: "20px",
        },
        height: {
          xs: "14px",
          md: "20px",
        },
      },
    },
    "&:hover": {
      backgroundColor: "#cf383879", // error_red (just with lesser opacity)
      "& > a svg": {
        transform: {
          xs: "translateX(-5px)",
          md: "translateX(-9px)",
        },
      },
    },
  },
}
