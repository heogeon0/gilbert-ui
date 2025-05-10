import { useEffect, useRef } from 'react'

import useIntersectionObserver from '@/hooks/useIntersectionObserver.ts'

const ioOptions = { threshold: 1 }

const useInfiniteScroll = (underFetcher?: () => void) => {
  const moreRef = useRef<HTMLDivElement>(null)

  const {
    entries: [entry],
  } = useIntersectionObserver(moreRef, ioOptions)

  const isIntersecting = entry?.isIntersecting
  useEffect(() => {
    if (isIntersecting) {
      underFetcher?.()
    }
  }, [isIntersecting])

  return {
    moreRef,
  }
}

export default useInfiniteScroll
