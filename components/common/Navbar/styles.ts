export const styles = {
  nav: {
    fontFamily: "Roboto Condensed !important",
    padding: {
      xs: "8px 4px",
      md: "10px 4px",
      xl: "15px 4px",
    },
    textTransform: "uppercase",
    fontWeight: 300,
    letterSpacing: {
      xs: "0px",
      sm: "1px",
    },
    fontSize: {
      xs: "19px",
      md: "22px",
      xl: "25px",
    },
  },
  navbarItems: {
    fontSize: {
      xs: "15px",
      md: "16px",
      xl: "20px",
    },
  },
  // subnav title
  subNavTitle: {
    fontSize: {
      xs: "40px",
      sm: "36px",
      md: "40px",
      lg: "56px",
      xl: "56px",
    },
    fontWeight: 700,
    color: "#ced1d2", // text_primary
    background: "linear-gradient(54deg, #c4c4c4 14%, #616161)",
    textFillColor: "transparent",
    backgroundClip: "text",
    paddingRight: {
      xs: "0px",
      md: "50px",
      lg: "100px",
      xl: "250px",
    },
    maxWidth: {
      xs: "85%",
      sm: "65%",
    },
  },
  // subnav button
  subNavThemeIcon: {
    display: {
      xs: "none",
      sm: "block",
      "& > button": {
        color: "#ebe1e1",
      },
    },
  },
  subNavButton: {
    backgroundColor: "#D9D9D9", // background_secondary
    color: "#111", // $text_secondary: #111;
    fontWeight: 500,
    textTransform: "capitalize",
    borderRadius: "10000px",
    "&:hover": {
      backgroundColor: "#D9D9D9", // background_secondary
    },
    letterSpacing: "0px",
    fontSize: {
      xs: "16px",
      md: "18px",
      xl: "22px",
    },
    padding: {
      xs: "7px 18px",
      md: "10px 23px",
      xl: "13px 32px",
    },
    marginTop: {
      xs: "20px",
      sm: "0px",
    },
  },
}
