export const styles = {
  teamSectionRoleFunFact: {
    fontWeight: 300,
    textAlign: "right",
    fontSize: {
      xs: "16px",
      sm: "18px",
      lg: "17px",
      xl: "18px",
    },
    fontStyle: "italic",
  },
  teamSectionButtonGroupWrapper: {
    display: "flex",
    alignItems: {
      sm: "center",
    },
    flexDirection: {
      xs: "column",
      sm: "row",
    },
  },
  teamSectionPersonName: {
    marginLeft: "auto",
    textDecoration: "underline",
    fontWeight: 300,
    marginTop: {
      xs: "16px",
      sm: "0px",
    },
  },
  teamSectionNameDivider: {
    height: "0.1px",
    width: "24px",
    backgroundColor: "#999",
    margin: "0px 16px",
    display: {
      xs: "none",
      sm: "inline-block",
    },
  },
  teamSectionBodyText: {
    textAlign: "left",
    wordBreak: "break-word",
    margin: "16px 0px",
    fontSize: {
      xs: "16px",
      md: "18px",
      xl: "20px",
    },
    lineHeight: {
      xs: "22px",
      md: "24px",
      xl: "26px",
    },
    fontWeight: 400,
  },
  skeletonCss: {
    position: "absolute",
    zIndex: 100,
    width: "100%",
    height: "100%",
    margin: "-64px 0px",
  },
  teamSectionImageWrapper: {
    minHeight: {
      xs: "280px",
      sm: "340px",
      md: "500px",
      lg: "400px",
    },
    height: "max-content",
    margin: "32px 0px",
    position: "relative",
  },
}
