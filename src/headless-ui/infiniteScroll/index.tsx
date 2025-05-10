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
  /** 위 도달했을 때, feching 함수 */
  upperFetcher?: () => void
  /** 아래로 스크롤 시 로딩 여부 */
  isUnderLoading?: boolean
  /** 위로 스크롤 시 로딩 여부 */
  isUpperLoading?: boolean
}

const InfiniteScroll = ({
  renderer,
  total,
  loadingComponent,
  upperFetcher,
  underFetcher,
}: Props) => {
  const { moreRefs } = useInfiniteScroll({ underFetcher, upperFetcher })
  return (
    <div className={'infinite-scroll-wrapper'}>
      <div
        ref={(el) => {
          moreRefs.current[0] = el
        }}
        id={'fetch-upper'}
        className="uppperRef"
      ></div>
      <ul className={'infinite-scroll-list'}>
        {Array.from({ length: total }, (_, index) => (
          <li key={index}>{renderer(index)}</li>
        ))}
      </ul>
      {loadingComponent && (
        <div className={'infinite-scroll-loading'}>{loadingComponent}</div>
      )}
      <div
        ref={(el) => {
          moreRefs.current[1] = el
        }}
        id={'fetch-under'}
        className="underRef"
      ></div>
    </div>
  )
}

export default InfiniteScroll
