export const LOCAL_URL = "http://localhost:3000"

export const externalLinks = {
  GITHUB: "https://github.com/kartik-dhawan",
  INSTAGRAM: "https://instagram.com/notkartikk",
  LINKEDIN: "https://www.linkedin.com/in/kartik-dhawan-13585b211/",
}

export const API_URLS = {
  GET_ALL_PALETTES: "/api/palettes",
  GET_NEW_PALETTE_AND_SAVE: "api/palettes/save",
  UPDATE_A_PALETTE: "/api/palettes", // followed by the guid
  GET_ALL_GRADIENTS: "/api/gradients",
  UPDATE_A_GRADIENT: "/api/gradients", // followed by the guid
}

export const INTERNAL_API_FAIL_ERROR_MESSAGE = {
  ALL_PALETTES:
    "Error. Could not fetch the data. Please try again. If the problem persists, please check your internet connection.",
}

export const COPIED_ALERT_TIMEOUT = 2000

export const gradientBoxTypes = ["tall", "wide", "square", "largeSquare"]

export const ColorOptionConstants = [
  {
    cid: 1,
    colorType: "Red",
    colorCode: "#8f1334",
  },
  {
    cid: 2,
    colorType: "Yellow",
    colorCode: "#d2fb7a",
  },
  {
    cid: 3,
    colorType: "Green",
    colorCode: "#3d9975",
  },
  {
    cid: 4,
    colorType: "Pink",
    colorCode: "#b37cec",
  },
  {
    cid: 5,
    colorType: "Blue",
    colorCode: "#2b6cae",
  },
  {
    cid: 6,
    colorType: "White",
    colorCode: "#b3c7d1",
  },
  {
    cid: 7,
    colorType: "Black",
    colorCode: "#3a3a3a",
  },
  {
    cid: 8,
    colorType: "Grey",
    colorCode: "#556371",
  },
  {
    cid: 9,
    colorType: "Orange",
    colorCode: "#f1bb4b",
  },
]

export const ColorNumberOptionsConstants = [2, 3, 4, 5]

export const popupAlertTitles = {
  COPIED: "Copied",
}

export const aboutSectionColorScheme = {
  navItemContentColors: [
    {
      route: "project",
      color: "#F3F3E8",
    },
    {
      route: "developer",
      color: "#D3E1E6",
    },
    {
      route: "team",
      color: "#D3E1E6",
    },
    {
      route: "more",
      color: "#FAF4F5",
    },
  ],
  navItemColors: [
    ["#666600", "#999966"],
    ["#136a8a", "#267871"],
    ["#004680", "#4484BA"],
    ["#964676", "#5f2081"],
  ],
}

export const RESET_EMAIL_SUCCESS_TEXT =
  "A password-reset link has been sent to your registered email ID. Follow the link to continue."
