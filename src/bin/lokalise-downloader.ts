#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "fs"
import { downloadLocalesAsJson } from "../fetcher"
import { Command, Option } from "commander"
import meta from "../../package.json"

const program = new Command()

program
  .addOption(
    new Option("-k, --api-key <apiKey>", "lokalise API key")
      .env("LOKALISE_API_KEY")
      .makeOptionMandatory(),
  )
  .addOption(
    new Option("-p, --project-id <projectId>", "lokalise project id")
      .env("LOKALISE_PROJECT_ID")
      .makeOptionMandatory(),
  )
  .addOption(
    new Option("-t, --tags <tags>", "lokalise project tags")
      .argParser((tags) => tags.split(","))
      .makeOptionMandatory(),
  )
  .addOption(
    new Option("-d, --destination <destination>", "destination folder").default(
      "./src/locales",
    ),
  )
  .version(meta.version)

program.parse()

type CLIOptions = {
  apiKey: string
  destination: string
  projectId: string
  tags: string[]
}

async function main({ apiKey, destination, projectId, tags }: CLIOptions) {
  const translations = await downloadLocalesAsJson(apiKey, projectId, tags)

  mkdirSync(destination, { recursive: true })

  translations.forEach((translation) => {
    writeFileSync(
      `${destination}/${translation.locale}.json`,
      JSON.stringify(translation.content, null, 2),
    )
  })
}

const options = program.opts<CLIOptions>()

main(options).catch((error) => {
  console.error(error)
  process.exit(1)
})
