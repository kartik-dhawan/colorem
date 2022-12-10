import { createClient } from "contentful"

export const contentfulConfig = {
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
}

export const client = createClient(contentfulConfig)
