import React from 'react'

import useInfiniteScroll from '@/headless-ui/infiniteScroll/useInfiniteScroll.ts'

export type Props = {
  /** Renderer 함수 */
  renderer: (index: number) => React.ReactNode
  /** 총 갯수 */
  total: number
  /** 로딩 시 보여줄 컴포넌트 */
  loadingComponent?: React.ReactNode
  /** 아래 도달했을 때, feching 함수 */
  underFetcher?: () => void
  /** 아래로 스크롤 시 로딩 여부 */
  isUnderLoading?: boolean
}

const InfiniteScroll = ({
  renderer,
  total,
  loadingComponent,
  underFetcher,
  isUnderLoading,
}: Props) => {
  const { moreRef } = useInfiniteScroll(underFetcher)

  return (
    <div className={'infinite-scroll-wrapper'}>
      <ul className={'infinite-scroll-list'}>
        {Array.from({ length: total }, (_, index) => (
          <React.Fragment key={index}>{renderer(index)}</React.Fragment>
        ))}
      </ul>
      {loadingComponent && isUnderLoading && (
        <div className={'infinite-scroll-loading'}>{loadingComponent}</div>
      )}
      <div ref={moreRef} id={'fetch-under'} className="underRef"></div>
    </div>
  )
}

export default InfiniteScroll
