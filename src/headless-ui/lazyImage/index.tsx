import { useEffect, useRef, useState } from 'react'

import useIntersectionObserver from '@/hooks/useIntersectionObserver.ts'

const ioOptions: IntersectionObserverInit = {
  threshold: 0,
}

type Props = {
  /** 이미지 source */
  src: string
  /** 이미지 width */
  width: number
  /** 이미지 height */
  height: number
}

const LazyImage = ({ width, height, src }: Props) => {
  const imgRef = useRef<HTMLElement>(null)
  const [loaded, setLoaded] = useState(false)

  const { entries, observerRef } = useIntersectionObserver(imgRef, ioOptions)

  const onLoad = () => {
    setLoaded(true)
  }

  useEffect(() => {
    const imgElement = imgRef.current
    if (!imgElement) return

    if ('loading' in HTMLImageElement.prototype) {
      imgElement.setAttribute('src', src)
      imgElement.setAttribute('loading', 'lazy')
      observerRef.current?.disconnect()
      return
    }

    const isVisible = entries[0]?.isIntersecting
    if (isVisible) {
      imgElement.addEventListener('load', onLoad, { once: true })
      imgElement.setAttribute('src', src)
      observerRef.current?.disconnect()
    }

    return () => {
      imgElement.removeEventListener('load', onLoad)
    }
  }, [src, entries, observerRef])

  console.log('check', width, height, loaded)
  return <></>
}

export default LazyImage
