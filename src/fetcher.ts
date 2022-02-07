import AdmZip from "adm-zip"
import fetch from "node-fetch"
import { LokaliseClient } from "./client/LokaliseClient"
import { FileFormat } from "./client/types/FileFormat"
import { PlaceholderFormat } from "./client/types/PlaceholderFormat"

export type LokaliseLocale = {
  locale: string
  content: object
}

export async function downloadLocalesAsJson(
  apiKey: string,
  projectId: string,
  tags: string[],
): Promise<LokaliseLocale[]> {
  const client = new LokaliseClient(apiKey)

  const { bundleUrl } = await client.downloadFiles({
    projectId,
    format: FileFormat.JSON,
    originalFilenames: false,
    placeholderFormat: PlaceholderFormat.I18N,
    includeTags: tags,
  })

  const data = await fetch(bundleUrl).then((res) => res.arrayBuffer())

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const buffer = Buffer.from(data, "binary")
  const zip = new AdmZip(buffer)
  const zipFiles = zip.getEntries()

  return zipFiles
    .filter((zipEntry) => zipEntry.name.endsWith("json"))
    .map(
      (zipEntry): LokaliseLocale => ({
        locale: zipEntry.name.replace(".json", ""),
        content: JSON.parse(zipEntry.getData().toString("utf8")),
      }),
    )
}
