import { useEffect, useState } from 'react'

function useUrl() {
  const [url, setUrl] = useState(null)

  useEffect(() => [setUrl(window.location.origin)], [])
  return url
}

export default useUrl
