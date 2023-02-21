export const styles = {
  gradientFilterToggleWrapper: {
    display: "flex",
    alignItems: "center",
    padding: "4px",
    minHeight: "50px",
    position: "relative",
  },
  gradientFilterSubMenuBtn: {
    color: "#d9d9d9",
    fontWeight: 400,
    fontSize: {
      xs: "16px",
      xl: "18px",
    },
    paddingLeft: "0px",
    textTransform: "uppercase",
    letterSpacing: "5px",
  },
  gradientFilterToggleRoute: {
    display: "flex",
    alignItems: "center",
    "& > span": {
      fontWeight: 300,
      padding: "0px 5px",
    },
  },
  gradientFilterClearTypeBtn: {
    color: "#d9d9d9",
    transition: "200ms all ease",
    padding: "2px 5px 0px 5px",
    "&:hover": {
      transform: "scale(1.1)",
    },
    "& > svg": {
      fontSize: "20px",
    },
  },
  filterByColorWrapper: {
    color: "#d9d9d9",
    display: "flex",
    alignItems: "center",
    margin: "2px 7px",
    padding: "2px 8px",
    border: "1.5px solid #444",
    gap: "8px",
    borderRadius: "1000px",
    cursor: "pointer",
    transition: "250ms all ease",
    textTransform: "none",
    "&:hover": {
      borderColor: "#777",
    },
  },
  filterByColorBall: {
    height: "13px",
    width: "13px",
    borderRadius: "50%",
  },
  filterByColorClearBtn: {
    color: "#d9d9d9",
    letterSpacing: "2px",
    fontWeight: 300,
    textTransform: "capitalize",
    "&:hover": {
      color: "#c7b4b4",
      backgroundColor: "transparent",
    },
  },
}
