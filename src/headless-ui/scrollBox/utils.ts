import { Elem } from '@/hooks/useIntersectionObserver.ts'

/** 현재 화면에 보이는 가장 왼쪽아이템, 오른쪽 아이템  */
type HorizontalPosition = {
  left: Elem
  right: Elem
}

type GetVisibleEdgeItems = (
  /** 아이템을 감싸는 부모 리스트 */
  $list: HTMLUListElement,
  /** 아이템 리스트 */
  $items: Elem[],
  /** 아이템이 살짝만 보이더라도 보이는것으로 처리할지 여부 */
  isStrict?: boolean
) => HorizontalPosition

export const getVisibleEdgeItems: GetVisibleEdgeItems = (
  $list,
  $items,
  isStrict = false
) => {
  const { left: listLeft, right: listRight } = $list.getBoundingClientRect()

  /** item의 left, right와 wrapper의 left, right를 비교하는 함수
   * @description
   * - 전부 화면상에 존재하는 조건: left >= lLeft && right <= lRight
   * - 애매하게 걸친 경우까지 인정하는 조건: left <=lRight && right >= lLeft
   * */
  const checkIsVisible = ($item: Elem) => {
    const { left, right } = $item?.getBoundingClientRect() || {
      left: 0,
      right: 0,
    }

    return isStrict
      ? left >= listLeft && right <= listRight
      : left <= listRight && right >= listLeft
  }

  const leftIndex = Math.max($items.findIndex(checkIsVisible), 0)
  const rightIndex = Math.min(
    $items.findLastIndex(checkIsVisible),
    $items.length - 1
  )

  return {
    left: $items[leftIndex],
    right: $items[rightIndex],
  }
}
