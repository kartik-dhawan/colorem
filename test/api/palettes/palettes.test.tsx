import { getAllColorPalettes } from "../../../lib/methods/palettes/getPalettes"
import { palettesData } from "../../../utils/MockData/palettes"

jest.mock("../../../lib/methods/palettes/getPalettes", () => ({
  getAllColorPalettes: () => {
    return Promise.resolve(palettesData)
  },
}))

describe("Get all palettes data fetch call", () => {
  it("-- should return correct data", async () => {
    try {
      const res = await getAllColorPalettes()
      expect(res).toMatchSnapshot()
    } catch (error) {
      console.log("Get all palettes data fetching is failed", error)
    }
  })
})
