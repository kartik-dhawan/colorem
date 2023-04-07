export const styles = {
  // folder shape containers
  fileSectionCardLowerRight: {
    borderRadius: {
      xs: "30px 0px 30px 30px",
      md: "30px 0px 30px 30px",
    },
    marginRight: "1.5rem",
    background: "linear-gradient(180deg, #19c7a20d 0%, #51bdd938 90%)", // green - green_color_1, green_color_2
    boxShadow: "0 2px 56px -18px #8787875c",
    backdropFilter: "blur( 4px )",
    height: {
      xs: "335px",
      sm: "350px",
      md: "400px",
      lg: "500px",
    },
  },
  fileSectionCardLowerLeft: {
    borderRadius: {
      xs: "0px 30px 30px 30px",
      md: "0px 30px 30px 30px",
    },
    marginLeft: "1.5rem",
    minHeight: {
      xs: "335px",
      sm: "350px",
      md: "400px",
      lg: "500px",
    },
    height: "max-content",
    border: "1px solid #fff3",
    boxShadow: "0 2px 56px -18px #8787875c",
    backdropFilter: "blur( 4px )",
  },
}
