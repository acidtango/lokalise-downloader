import { FileFormat } from "./FileFormat"
import { TranslationStatus } from "./TranslationStatus"
import { SortType } from "./SortType"
import { ExportAs } from "./ExportAs"
import { Trigger } from "./Trigger"
import { PluralFormat } from "./PluralFormat"
import { PlaceholderFormat } from "./PlaceholderFormat"
import { IndentationType } from "./IndentationType"

export type DownloadFilesRequest = {
  projectId: string
  /**
   * File format (e.g. json, strings, xml). Must be file extension of any of the file formats we support. May also be `ios_sdk` or `android_sdk` for respective OTA SDK bundles.
   */
  format: FileFormat
  /**
   * Enable to use original filenames/formats. If set to `false` all keys will be export to a single file per language.
   */
  originalFilenames?: boolean
  /**
   * Bundle structure, used when `original_filenames` set to `false`. Allowed placeholders are `%LANG_ISO%`, `%LANG_NAME%`, `%FORMAT%` and `%PROJECT_NAME%`).
   */
  bundleStructure?: string
  /**
   * Directory prefix in the bundle, used when `original_filenames` set to `true`). Allowed placeholder is `%LANG_ISO%`.
   */
  directoryPrefix?: string
  /**
   * Enable to include all platform keys. If disabled, only the keys, associated with the platform of the `format` will be exported.
   */
  allPlatforms?: boolean
  /**
   * List of languages to export. Omit this parameter for all languages.
   */
  filterLangs?: string[]
  /**
   * Narrow export data range. Allowed values are `translated` or `untranslated`, `reviewed` (or `reviewed_only`), `last_reviewed_only`, `verified` and `nonhidden`.
   */
  filterData?: TranslationStatus[]
  /**
   * Only keys attributed to selected files will be included. Leave empty for all.
   */
  filterFilenames?: string[]
  /**
   * Enable to add new line at end of file (if supported by format).
   */
  addNewlineEof?: boolean
  /**
   * Only translations attributed to selected custom statuses will be included. Leave empty for all.
   */
  customTranslationStatusIds?: string[]
  /**
   * Narrow export range to tags specified.
   */
  includeTags?: string[]
  /**
   * Specify to exclude keys with these tags.
   */
  excludeTags?: string[]
  /**
   * Export key sort mode. Allowed value are `first_added`, `last_added`, `last_updated`, `a_z`, `z_a`.
   */
  exportSort?: SortType
  /**
   * Select how you would like empty translations to be exported. Allowed values are `empty` to keep empty, base to replace with the `base` language value, `null` to replace with null (YAML export only), or `skip` to omit.
   * @default empty
   */
  exportEmptyAs?: ExportAs
  /**
   * (Ruby on Rails YAML export only) Select how you would like null (void) translations to be exported. Allowed values are `null` to keep null, empty to replace with `empty` string.
   * @default ""
   */
  exportNullAs?: string
  /**
   * Enable to include key comments and description in exported file (if supported by the format).
   */
  includeComments?: boolean
  /**
   * Enable to include key description in exported file (if supported by the format).
   */
  includeDescription?: boolean
  /**
   * Other projects ID's, which keys should be included with this export.
   */
  includePids?: string[]
  /**
   * Trigger integration exports (must be enabled in project settings). Allowed values are `amazons3`, `gcs`, `github`, `github-enterprise`, `gitlab`, `bitbucket`, `bitbucket-enterprise`, `azure`.
   */
  triggers?: Trigger[]
  /**
   * Pull requests will be created only for listed repositories (`organization/repository` format). Leave empty array to process all configured integrations by platform only.
   */
  filterRepositories?: string[]
  /**
   * Enable to replace line breaks in exported translations with \n.
   * @default true
   */
  replaceBreaks?: boolean
  /**
   * Enable to skip automatic replace of key reference placeholders (e.g. [%key:hello_world%]) with their corresponding translations.
   */
  disableReferences?: boolean
  /**
   * Override the default plural format for the file type. Allowed values are `json_string`, `icu`, `array`, `generic`, `symfony`, `i18next`. See Plurals and placeholders for more information about plural support for specific file formats.
   */
  pluralFormat?: PluralFormat
  /**
   * Override the default placeholder format for the file type. Allowed values are `printf`, `ios`, `icu`, `net`, `symfony`). See Plurals and placeholders for more information.
   */
  placeholderFormat?: PlaceholderFormat
  /**
   * Once the export is complete, sends a HTTP POST with the generated bundle URL to the specified URL.
   */
  webhookUrl?: string
  /**
   * List of languages to override default iso codes for this export.
   */
  languageMapping?: object
  /**
   * If enabled, plural forms `zero`, `one` and `two` will be replaced with `=0`, `=1` and `=2` respectively. Only works for ICU plural format.
   */
  icuNumeric?: boolean

  /**
   * Only works for printf placeholder format. When enabled, all universal percent placeholders "[%]" will be always exported as "%%".
   */
  escapePercent?: boolean
  /**
   * Provide to override default indentation in supported files. Allowed values are `default`, `1sp`, `2sp`, `3sp`, `4sp`, `5sp`, `6sp`, `7sp`, `8sp` and `tab`.
   */
  indentation?: IndentationType
  /**
   * (YAML export only). Enable to include language ISO code as root key.
   */
  yamlIncludeRoot?: boolean
  /**
   * (JSON export only). Enable to leave forward slashes unescaped.
   */
  jsonUnescapedSlashes?: boolean
  /**
   * (Java Properties export only). Encoding for .properties files. Allowed values are `utf-8` and `latin-1`.
   */
  javaPropertiesEncoding?: string
  /**
   * (Java Properties export only). Separator for keys/values in .properties files. Allowed values are `=` and `:`.
   */
  javaPropertiesSeparator?: string
  /**
   * Description of the created bundle. Applies to `ios_sdk` or `android_sdk` OTA SDK bundles.
   */
  bundleDescription?: string
}
