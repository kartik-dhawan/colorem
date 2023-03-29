export const styles = {
  moreSectionIconContainer: {
    display: "flex",
    justifyContent: "center",
    gap: {
      xs: "16px",
      sm: "20px",
      lg: "24px",
    },
    margin: {
      xs: "24px 0px 32px 0px",
      sm: "32px 0px 32px 0px",
    },
    "& > a:any-link": {
      color: "#222",
      position: "relative",
    },
  },
  moreSectionIconAfter: {
    position: "absolute",
    fontSize: "14px",
    bottom: "-25px",
    left: "-10px",
    backgroundColor: "#444",
    borderRadius: "3px",
    color: "#c4c4c4",
    fontWeight: 300,
    letterSpacing: "0.8px",
    padding: "2px 4px",
    opacity: 0,
    transition: "150ms all ease",
  },
  moreSectionIcon: {
    "&::before": {
      content: `""`, // eslint-disable-line
      position: "absolute",
      backgroundColor: "#444",
      height: "8px",
      width: "8px",
      bottom: "-10px",
      left: "15px",
      transform: "rotate(45deg)",
      opacity: 0,
      transition: "150ms all ease",
    },
    "&:hover": {
      "&::after": {
        opacity: {
          lg: 1,
        },
      },
      "&::before": {
        opacity: {
          lg: 1,
        },
      },
    },
    "& > svg": {
      fontSize: {
        xs: "28px",
        sm: "32px",
        md: "36px",
        lg: "40px",
      },
    },
  },
}
