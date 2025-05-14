import { globalStyle, style } from '@vanilla-extract/css'

export const scrollBoxList = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
  flexWrap: 'nowrap',
  overflow: 'auto',
  width: '100%',
  height: '100%',
})

export const scrollBoxWrapper = style({
  position: 'relative',
})

export const defaultButton = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: 40,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  border: 0,
  borderRadius: 5,
  display: 'block',
  cursor: 'pointer',
})

/** 자식들이 flex로 인해 사이즈가 줄어드는 것 방지 */
globalStyle(`.${scrollBoxList} > li`, {
  flexShrink: 0,
})
