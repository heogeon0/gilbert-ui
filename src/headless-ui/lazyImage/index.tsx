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
  /** 로딩 시 보여줄 컴포넌트 */
  loadingComponent?: React.ReactNode
}

/**
 * LazyImage 컴포넌트
 * @description
 * - IntersectionObserver를 사용하여 화면에 보일때 이미지를 로드합니다.
 * - 로딩 시 보여줄 컴포넌트를 props로 전달할 수 있습니다.
 * */
const LazyImage = ({ width, height, src, loadingComponent }: Props) => {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [loaded, setLoaded] = useState(false)

  const { entries, observerRef } = useIntersectionObserver(imgRef, ioOptions)

  const onLoad = () => {
    setLoaded(true)
  }

  useEffect(() => {
    const imgElement = imgRef.current
    if (!imgElement) return

    /** 화면에 돔이 탐지되었을때, src를 입력하여 데이터 입력 */
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

  return (
    <div
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <img
        style={{
          transition: 'opacity 0.5s ease-in-out',
          opacity: loaded ? 1 : 0,
        }}
        ref={imgRef}
        width={width}
        height={height}
        alt=""
      />
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          transition: 'opacity 0.5s ease-in-out',
          opacity: loaded ? 0 : 1,
          zIndex: 1,
          top: 0,
          left: 0,
        }}
      >
        {loadingComponent}
      </div>
    </div>
  )
}

export default LazyImage
