const commonUtilStyles = {
  cardFieldTitle: {
    fontWeight: 300,
    "& > .skillCardFieldTitle": {
      textTransform: "uppercase",
      fontSize: "12px",
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
    marginTop: "2rem",
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      md: "1fr 1fr",
      lg: "1fr 1fr 1fr",
    },
    gap: "16px",
  },
  skillCardFieldText: {
    ...commonUtilStyles.cardFieldTitle,
    "& > .skillCardFieldValue": {
      fontSize: "18px",
    },
  },
  skillCardFieldProgressBar: {
    ...commonUtilStyles.cardFieldTitle,
  },
  skillCardDetailsSection: {
    margin: "16px 4px",
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr 1fr",
      lg: "1fr",
    },
    gap: "16px",
  },
  // developerSection
}
