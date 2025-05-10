import { useEffect, useRef } from 'react'

import useIntersectionObserver, {
  Elem,
} from '@/hooks/useIntersectionObserver.ts'

const ioOptions = { threshold: 1 }

type Params = {
  underFetcher?: () => void
  upperFetcher?: () => void
}

const useInfiniteScroll = ({ underFetcher, upperFetcher }: Params) => {
  const moreRefs = useRef<[Elem, Elem]>([null, null])

  const { entries, observerRef } = useIntersectionObserver(moreRefs, ioOptions)

  useEffect(() => {
    entries.forEach(async (entry) => {
      if (!entry.isIntersecting) return

      if (entry.target.id === 'upper') {
        upperFetcher?.()
      }

      if (entry.target.id === 'under') {
        underFetcher?.()
      }
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [entries])

  return {
    moreRefs,
  }
}

export default useInfiniteScroll
