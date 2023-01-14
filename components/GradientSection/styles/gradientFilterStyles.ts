export const styles = {
  gradientFilterToggleWrapper: {
    display: "flex",
    alignItems: "center",
    padding: "4px",
    minHeight: "50px",
  },
  gradientFilterSubMenuBtn: {
    color: "#d9d9d9",
    fontWeight: 400,
    fontSize: {
      xs: "20px",
      md: "24px",
    },
    paddingLeft: "0px",
    textTransform: "underline",
  },
  gradientFilterToggleRoute: {
    "& > span": {
      fontWeight: 300,
      padding: "0px 5px",
    },
  },
  gradientFilterClearTypeBtn: {
    color: "#d9d9d9",
    transition: "200ms all ease",
    padding: "2px 0px 0px 0px",
    "&:hover": {
      transform: "scale(1.1)",
    },
    "& > svg": {
      fontSize: "20px",
    },
  },
}
