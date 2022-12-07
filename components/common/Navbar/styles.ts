export const styles = {
  nav: {
    padding: {
      xs: "7px 4px",
      sm: "10px 4px",
      md: "12px 4px",
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
  // subnav title
  subNavTitle: {
    fontSize: {
      xs: "30px",
      md: "34px",
      lg: "36px",
      xl: "40px",
    },
    fontWeight: 500,
    color: "#D9D9D9", // text_primary
  },
  // subnav button
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
      xs: "7px 15px",
      md: "10px 23px",
      xl: "13px 30px",
    },
    marginTop: {
      xs: "20px",
      sm: "0px",
    },
  },
}
