// run COLORMIND_MODELS_API on postman to update the models.
export const URLS = {
  COLORMIND_API: "http://colormind.io/api/",
  COLORMIND_MODELS_API: "http://colormind.io/list/",
}

export const COLORMIND_MODELS = [
  "ui",
  "default",
  "city_photography",
  "makoto_shinkai",
  "the_fall",
  "the_wind_rises",
]

export const responseTexts = {
  TRY_DIFFERENT_REQUEST:
    "Cannot access this api. Try sending a different type of request to this API.",
  COULD_NOT_COMPLETE: {
    COLORMIND: "Could not fetch the palette from ColorMind API",
    COLORMIND_MODEL: "Could not fetch the palette from ColorMind API",
    MONGODB_SAVE: "Could not save the palette to MongoDB",
    MONGODB_FETCH: "Could not fetch color palettes from MongoDB",
    PUT: "Could not complete the PUT request.",
  },
  SELECT_TYPE_PUT: "Please select a type of PUT request in context to the app.",
  PALETTE_NOT_FOUND:
    "Palette not found. Please verify the paletteGuid. If it is correct, the database doesn't consist of this record.",
  GRADIENT_NOT_FOUND:
    "Gradient not found. Please verify the gradientGuid. If it is correct, the database doesn't consist of this record.",
  BODY_NOT_PRESENT:
    "Request body is either not present or incorrect. Please pass a valid body in the API request",
  INCORRECT_GUID_TYPE: "Please enter a valid ID type in the url.",
}

export const SaveGradientBodyKeys = ["name", "colors", "filter"]

export const PUT_TYPES = ["Like/Unlike"]
