const commonUtilStyles = {
  cardFieldTitle: {
    fontWeight: 300,
    "& > .skillCardFieldTitle": {
      textTransform: "uppercase",
      fontSize: {
        xs: "14px",
        md: "12px",
        xl: "14px",
      },
      fontWeight: 400,
      letterSpacing: "1px",
      color: "#999999",
      paddingBottom: "4px",
    },
  },
}

export const styles = {
  developerSectionBody: {
    margin: "16px 0px",
    fontSize: {
      xs: "19px",
      lg: "18px",
      xl: "20px",
    },
    lineHeight: {
      xs: "28px",
      lg: "27px",
      xl: "30px",
    },
    textAlign: "right",
    fontStyle: "italic",
    fontWeight: 300,
  },
  developerSectionCardsWrapper: {
    marginTop: "16px",
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      md: "1fr 1fr",
      lg: "1fr 1fr 1fr",
    },
    gap: {
      xs: "16px",
      md: "20px",
      lg: "16px",
    },
    height: { lg: "30rem" },
    overflowY: "scroll",
  },
  developerSectionSkillset: {
    fontSize: "24px",
    textTransform: "uppercase",
    fontWeight: 600,
    marginTop: "24px",
  },
  skillCardWrapper: {
    color: "#c4c4c4",
    backgroundColor: "#222",
    padding: {
      xs: "14px",
      lg: "10px",
    },
    height: "max-content",
    overflow: "hidden",
    position: "relative",
    width: "-webkit-fill-available",
    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: {
        xs: "-400px",
        sm: "-500px",
        lg: "-300px",
      },
      width: {
        xs: "45%",
        md: "60%",
      },
      height: "100%",
      background: "rgba(255, 255, 255, 0.2)",
      transform: "skewX(-30deg)",
      transition: "0.4s",
    },
    "&:hover::before": {
      left: {
        xs: "550px",
        sm: "800px",
        lg: "250px",
      },
      background: "rgba(255, 255, 255, 0.1)",
    },
  },
  skillCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    margin: "4px 0px 0px 4px",
    "& > svg": {
      height: "24px",
      aspectRatio: "1",
    },
  },
  skillCardFieldText: {
    ...commonUtilStyles.cardFieldTitle,
    "& > .skillCardFieldValue": {
      fontSize: {
        xs: "20px",
        md: "18px",
        xl: "20px",
      },
    },
  },
  skillCardDetailsSection: {
    margin: "16px 4px",
    display: "grid",
    gridTemplateAreas: {
      xs: `"hands work"
      "fluency fluency"
      "adap adap"`,
      lg: `"hands hands"
      "work work"
      "fluency fluency"
      "adap adap"`,
    },
    gap: "16px",
  },
  skillCardProgressBarField: {
    ...commonUtilStyles.cardFieldTitle,
  },
  skillCardProgressBar: {
    height: "6px",
    borderRadius: "100px",
    backgroundColor: "#373737",
    marginTop: "4px",
  },
  skillCardSeeMoreLessButton: {
    display: "flex",
    justifyContent: "center",
    color: "#111",
    width: "100%",
    margin: "8px 0px",
    "&:hover": {
      color: "#111",
      backgroundColor: "transparent",
      textDecoration: "underline",
    },
  },
}
