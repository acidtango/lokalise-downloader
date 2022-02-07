import nodeFetch from "node-fetch"
import { camelCase, snakeCase } from "change-case"
import { DownloadFilesRequest } from "./types/DownloadFilesRequest"
import { DownloadFilesResponse } from "./types/DownloadFilesResponse"
import { LokaliseErrorResponse } from "./types/LokaliseErrorResponse"

export class LokaliseClient {
  private static BASE_URL = "https://api.lokalise.com"

  public constructor(private apiKey: string, private fetch = nodeFetch) {}

  public async downloadFiles({
    projectId,
    ...rest
  }: DownloadFilesRequest): Promise<DownloadFilesResponse> {
    const response = await this.fetch(
      `${LokaliseClient.BASE_URL}/api2/projects/${projectId}/files/download`,
      {
        method: "POST",
        body: JSON.stringify(LokaliseClient.keysToSnakeCase(rest)),
        headers: {
          "content-type": "application/json",
          "x-api-token": this.apiKey,
        },
      },
    )

    const data = await response.json()

    return LokaliseClient.parseResponse<DownloadFilesResponse>(data)
  }

  private static parseResponse<T>(response: object): T {
    if (LokaliseClient.isLokaliseError(response)) {
      throw new Error(response.error.message)
    }

    return this.keysToCamelCase<T>(response)
  }

  private static keysToCamelCase<T>(response: object) {
    return Object.fromEntries(
      Object.entries(response).map(([key, value]) => [camelCase(key), value]),
    ) as T
  }

  private static keysToSnakeCase<T>(response: object) {
    return Object.fromEntries(
      Object.entries(response).map(([key, value]) => [snakeCase(key), value]),
    ) as T
  }

  private static isLokaliseError(
    response: object,
  ): response is LokaliseErrorResponse {
    return "error" in response
  }
}
