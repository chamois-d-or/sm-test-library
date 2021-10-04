import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

import { apiEndpoint } from "./../sm.json"; // import the endpoint name
const repoName = /([a-zA-Z0-9-]+)?(\.cdn)?\.prismic\.io/.exec(apiEndpoint)[1] //Regex to get repo ID

function getExitPreviewRoute(router) {
  const defaultPreviewExitUrl = '/api/exit-preview'
  const linkUrl = router.asPath ? `${defaultPreviewExitUrl}?currentUrl=${router.asPath}` : defaultPreviewExitUrl
  return linkUrl
}

export default function useUpdatePreview(previewRef, documentId) {
  const router = useRouter()
  const previewExitRoute = getExitPreviewRoute(router)
  useEffect(() => {
    const rawPreviewCookie = Cookies.get('io.prismic.preview')
    const previewCookie = rawPreviewCookie ? JSON.parse(rawPreviewCookie) : null

    const previewCookieObject = previewCookie ? previewCookie[`${repoName}.prismic.io`] : null

    const previewCookieRef = previewCookieObject && previewCookieObject.preview
      ? previewCookieObject.preview
      : null

    if (router.isPreview) {
      if (rawPreviewCookie && previewCookieRef) {
        if (previewRef !== previewCookieRef) {
          return router.push(`/api/preview?token=${previewCookieRef}&documentId=${documentId}`)
        }
      } else {
        return router.push(previewExitRoute)
      }
    } else if (rawPreviewCookie && previewCookieRef) {
      return router.push(`/api/preview?token=${previewCookieRef}&documentId=${documentId}`)
    }
    return undefined
  }, [])
}