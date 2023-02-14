export const styles = {
  aboutSideNavWrapper: {
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
      xs: "17px",
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
      xs: "0px 24px",
      md: "0px 32px",
      lg: "0px 40px",
    },
    lineHeight: {
      xs: "52px",
      sm: "65px",
      md: "80px",
      xl: "110px",
    }, // keep the line height the same as the fontSize
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
}
