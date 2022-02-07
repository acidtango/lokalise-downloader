import { mkdirSync, writeFileSync } from "fs"
import { downloadLocalesAsJson } from "../fetcher"

const help = `
Usage: lokalise-downloader <apiKey> <projectId> tag1,tag2,tag3`

async function main() {
  const args = process.argv

  if (args.includes("-h") || args.includes("--help")) {
    console.log(help)
    return
  }

  const apiKey = process.env.LOKALISE_API_KEY || process.argv[2]
  const projectId = process.env.LOKALISE_PROJECT_ID || process.argv[3]
  const tagsStr = process.env.LOKALISE_PROJECT_TAGS || process.argv[4]

  if (!apiKey) throw new Error("Missing apiKey parameter")
  if (!projectId) throw new Error("Missing projectId parameter")
  if (!tagsStr) throw new Error("Missing tags parameter")

  const tags = tagsStr.split(",")

  const translations = await downloadLocalesAsJson(apiKey, projectId, tags)

  mkdirSync(`./public/locales`, { recursive: true })

  translations.forEach((translation) => {
    writeFileSync(
      `./public/locales/${translation.locale}.json`,
      JSON.stringify(translation.content, null, 2),
    )
  })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
