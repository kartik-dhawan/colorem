import { PaletteDataType } from "./interfaces"

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

export const initialDashboardPalettesData: PaletteDataType[] = [
  {
    _id: "639a0ac9e9a48bb5f02afa2b",
    hex: ["788db4", "3f3b68", "5f6b81", "aaa38f", "adb995"],
    name: "coffee slope",
    paletteGuid: "c8e9fefd-515c-4c3a-9b32-595b07f252f9",
    rgb: [
      [120, 141, 180],
      [63, 59, 104],
      [95, 107, 129],
      [170, 163, 143],
      [173, 185, 149],
    ],
    model: "makoto_shinkai",
    __v: 0,
    likes: 3,
  },
  {
    _id: "639a0ad3e9a48bb5f02afa2d",
    hex: ["44381f", "7d8230", "becf8f", "69b388", "629a8b"],
    name: "jump exercise",
    paletteGuid: "6d91d4b1-cd78-4503-8ecd-3525f5f8e8bb",
    rgb: [
      [68, 56, 31],
      [125, 130, 48],
      [190, 207, 143],
      [105, 179, 136],
      [98, 154, 139],
    ],
    model: "the_wind_rises",
    __v: 0,
    likes: 0,
  },
  {
    _id: "639a0c75e9a48bb5f02afa2f",
    hex: ["36251b", "845f58", "ab9e97", "d0cec9", "6b6c70"],
    name: "headed oldest",
    paletteGuid: "549cf550-c198-4452-9ad9-78d80d8f78e3",
    rgb: [
      [54, 37, 27],
      [132, 95, 88],
      [171, 158, 151],
      [208, 206, 201],
      [107, 108, 112],
    ],
    model: "city_photography",
    __v: 0,
    likes: 0,
  },
  {
    _id: "639a0cace9a48bb5f02afa31",
    hex: ["1d1229", "3d5189", "2c56ab", "6497be", "cec0b2"],
    name: "bean aside",
    paletteGuid: "5022510a-a109-4297-a4ea-4ccb000cb571",
    rgb: [
      [29, 18, 41],
      [61, 81, 137],
      [44, 86, 171],
      [100, 151, 190],
      [206, 192, 178],
    ],
    model: "city_photography",
    __v: 0,
    likes: 0,
  },
]
