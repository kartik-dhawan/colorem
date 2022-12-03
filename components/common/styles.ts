export const styles = {
  // nav
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
    color: "#D9D9D9",
  },
  // subnav button
  subNavButton: {
    backgroundColor: "#D9D9D9",
    color: "#111",
    fontWeight: 500,
    textTransform: "capitalize",
    borderRadius: "10000px",
    "&:hover": {
      backgroundColor: "#D9D9D9",
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
  // folder shape containers
  fileSectionCardUpperRight: {
    justifyContent: "flex-end",
    marginRight: "1.5rem",
    "& > div": {
      borderBottom: "30px solid #19c7a2",
      borderLeft: "25px solid transparent",
      borderTopRightRadius: "20px",
    },
  },
  fileSectionCardUpperLeft: {
    justifyContent: "flex-start",
    marginLeft: "1.5rem",
    "& > div": {
      borderBottom: "30px solid #fdc449",
      borderRight: "25px solid transparent",
      borderTopLeftRadius: "20px",
    },
  },
  fileSectionCardLowerRight: {
    borderRadius: "20px 0px 20px 20px",
    marginRight: "1.5rem",
    background: "linear-gradient(180deg, #19c7a2 0%, #51d9bc 90%)", // green
  },
  fileSectionCardLowerLeft: {
    borderRadius: "0px 20px 20px 20px",
    marginLeft: "1.5rem",
    backgroundColor: "#fdc449", // yellow
  },
}
