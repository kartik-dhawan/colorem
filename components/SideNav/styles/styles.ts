export const styles = {
  sideNavDrawer: {
    "& .MuiDrawer-paper": {
      width: "100vw",
      backgroundColor: "#111",
      height: "100vh",
      display: "flex",
    },
  },
  sideNavCloseBtn: {
    position: "absolute",
    right: 0,
    fontWeight: 300,
    letterSpacing: "1px",
    fontFamily: "Nunito Sans",
    backgroundColor: "#1db954", // spotify_green
    padding: {
      xs: "3px 14px",
      md: "4px 20px",
    },
    fontSize: {
      xs: "18px",
      sm: "20px",
    },
    borderRadius: "0px",
    "&:hover": {
      backgroundColor: "#1db954", // spotify_green
    },
  },
  sideNavWrapper: {
    display: "flex",
    flexDirection: "column",
  },
}
