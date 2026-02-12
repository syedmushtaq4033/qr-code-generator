const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL

export const SITE_BASE_URL = (configuredSiteUrl || "https://www.qrcodegenerator.codes").replace(/\/+$/, "")

