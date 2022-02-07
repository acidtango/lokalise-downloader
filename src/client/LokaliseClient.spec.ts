import fetchMock, { FetchMockSandbox } from "fetch-mock"
import { LokaliseClient } from "./LokaliseClient"
import { FileFormat } from "./types/FileFormat"

describe("LokaliseClient", () => {
  const LOKALISE_API_KEY = "0123456789abcdef0123456789abcdef01234567"
  const DOWNLOAD_FILES_URL = "express:/api2/projects/:project_id/files/download"
  const PROJECT_ID = "0123456789abcdef012345.01234567"
  const BUNDLE_URL =
    "https://s3.eu-west-1.amazonaws.com/lokalise-assets/files/export/31203986a712987aba9287.34932324/0123456789abcdef0123456789abcd/MyProject-locale.zip"
  let lokalise: LokaliseClient
  let fetchMockInstance: FetchMockSandbox

  beforeEach(() => {
    fetchMockInstance = fetchMock.sandbox().mock(DOWNLOAD_FILES_URL, 200, {
      response: {
        project_id: PROJECT_ID,
        bundle_url: BUNDLE_URL,
      },
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    lokalise = new LokaliseClient(LOKALISE_API_KEY, fetchMockInstance)
  })

  it("calls the API with the correct parameters", async () => {
    await lokalise.downloadFiles({
      projectId: PROJECT_ID,
      format: FileFormat.JSON,
      originalFilenames: true,
    })

    expectLastCalledWithBody(fetchMockInstance, {
      format: FileFormat.JSON,
      original_filenames: true,
    })
    expectLastCalledUrlIncludes(fetchMockInstance, PROJECT_ID)
    expectLastCalledWithHeader(
      fetchMockInstance,
      "x-api-token",
      LOKALISE_API_KEY,
    )
  })

  it("correctly parses the response", async () => {
    const data = await lokalise.downloadFiles({
      projectId: PROJECT_ID,
      format: FileFormat.JSON,
    })

    expect(data).toEqual({
      bundleUrl: BUNDLE_URL,
      projectId: PROJECT_ID,
    })
  })

  it("correctly parses errors", async () => {
    const ERROR_MESSAGE = "Invalid `project_id` parameter"
    fetchMockInstance = fetchMockInstance.mock(DOWNLOAD_FILES_URL, 400, {
      overwriteRoutes: true,
      response: {
        error: { message: ERROR_MESSAGE, code: 400 },
      },
    })

    const error = await lokalise
      .downloadFiles({
        projectId: "invalid project id",
        format: FileFormat.JSON,
      })
      .catch((e) => e)

    expect(error).toEqual(new Error(ERROR_MESSAGE))
  })
})

function expectLastCalledWithBody(
  fetch: FetchMockSandbox,
  expectedObject: object,
) {
  const lastCall = fetch.lastOptions()

  if (!lastCall) {
    throw new Error("expected to have a last call")
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(JSON.parse(lastCall.body)).toEqual(expectedObject)
}

function expectLastCalledUrlIncludes(fetch: FetchMockSandbox, str: string) {
  const lastCall = fetch.lastUrl()

  if (!lastCall) {
    throw new Error("expected to have a last call")
  }

  expect(lastCall).toContain(str)
}

function expectLastCalledWithHeader(
  fetch: FetchMockSandbox,
  headerKey: string,
  expectedHeaderValue: string,
) {
  const lastCall = fetch.lastOptions()

  if (!lastCall) {
    throw new Error("expected to have a last call")
  }

  const actualHeaderValue = lastCall.headers && lastCall.headers[headerKey]

  expect(actualHeaderValue).toEqual(expectedHeaderValue)
}
