export const styles = {
  aboutSideNavWrapper: {
    minHeight: "100vh",
    maxHeight: "-webkit-fill-available",
    margin: {
      xs: "24px 30px",
      sm: "30px 50px",
    },
    flex: 1,
  },
  aboutSideNavMenuButton: {
    color: "#c4c4c4",
    padding: "0px",
    margin: "0px",
    "&>svg": {
      fontSize: {
        xs: "24px",
        md: "32px",
        xl: "40px",
      },
    },
  },
  aboutSideNavTitleText: {
    fontWeight: 300,
    letterSpacing: "1px",
    color: "#c4c4c4",
    fontSize: {
      xs: "16px",
      md: "19px",
      xl: "22px",
    },
    padding: {
      xs: "0px 24px",
      md: "0px 32px",
      lg: "0px 40px",
    },
    margin: {
      xs: "8px 0px",
      md: "15px 0px",
    },
  },
  aboutSideNavListItemWrapper: {
    padding: {
      xs: "5px 24px",
      sm: "0px 24px",
      md: "0px 32px",
      lg: "0px 40px",
    },
    lineHeight: {
      xs: "50px",
      sm: "65px",
      md: "80px",
      xl: "110px",
    }, // keep the line height the same as the fontSize
    "& > a": {
      textDecoration: "none",
    },
    cursor: "pointer",
  },
  aboutSideNavListItem: {
    padding: "0px",
    color: "#c4c4c4",
    fontSize: {
      xs: "50px",
      sm: "65px",
      md: "80px",
      xl: "110px",
    },
    textTransform: "uppercase",
    transition: "100ms all ease-in-out",
    "&:hover": {
      color: "#999999",
    },
  },
  aboutSideNavButtonGroup: {
    margin: {
      xs: "0px 24px",
      md: "0px 32px",
      lg: "0px 40px",
    },
  },
  aboutSideNavButtonsCommon: {
    borderRadius: "0px",
    fontSize: {
      xs: "16px",
      sm: "18px",
      xl: "22px",
    },
    fontWeight: 400,
    padding: {
      xs: "5px 16px",
      sm: "6px 16px",
      md: "8px 16px",
    },
  },
  aboutSideNavHomeButton: {
    color: "#adadad",
    borderColor: "#adadad",
    "&:hover": {
      color: "#c4c4c4",
      borderColor: "#c4c4c4",
    },
  },
  aboutSideNavBackButton: {
    backgroundColor: "#adadad",
    color: "#111",
    borderColor: "#adadad",
    "&:hover": {
      backgroundColor: "#c4c4c4",
      color: "#111",
    },
  },
}
