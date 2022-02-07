# Lokalise Downloader

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/acidtango/lokalise-downloader/CI)](https://github.com/acidtango/lokalise-downloader/actions)
[![npm](https://img.shields.io/npm/v/@acid-tango/lokalise-downloader)](https://www.npmjs.com/package/@acid-tango/lokalise-downloader)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/acidtango/lokalise-downloader/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

Utility for downloading Lokalise translations either using the CLI or programatically

## Installation

Install lokalise-downloader as an npm module and save it to your package.json file as a development dependency:

```bash
npm install --save-dev @acid-tango/lokalise-downloader
```

## CLI Usage

```
lokalise-downloader <apiKey> <projectId> tag1,tag2,tag3
```

Alternativelly, you can pass the `apiKey` and `projectId` through environment variables:

```
export LOKALISE_API_KEY <apiKey>
export LOKALISE_PROJECT_ID <projectId>
export LOKALISE_PROJECT_TAGS <tags>
```

## Programatic usage

```ts
import { downloadLocalesAsJson } from "@acid-tango/lokalise-downloader"

const apiKey = "<apiKey>"
const projectId = "<projectId>"
const tags = ["api", "frontend"]

const translations = await downloadLocalesAsJson(apiKey, projectId, tags)

console.log(translations)
```

## License

MIT
