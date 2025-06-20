// styles/preflight.css.ts
import { globalStyle } from '@vanilla-extract/css'

globalStyle('.no-scroll', {
  overflow: 'hidden',
})

// Box sizing
globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
  borderWidth: '0',
  borderStyle: 'solid',
  borderColor: 'currentColor',
})

// Remove default margin
globalStyle('body, h1, h2, h3, h4, h5, h6, p, figure, blockquote, dl, dd', {
  margin: 0,
})

// Set core body defaults
globalStyle('body', {
  lineHeight: 1.5,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  textRendering: 'optimizeLegibility',
})

// Remove list styles on ul, ol elements with a list role
globalStyle('ul[role="list"], ol[role="list"]', {
  listStyle: 'none',
})

// Reset list styles generally
globalStyle('ul, ol', {
  listStyle: 'none',
  margin: 0,
  padding: 0,
})

// Set default font inheritance and smoothing
globalStyle('html', {
  fontFamily: 'system-ui, sans-serif',
  lineHeight: '1.5',
  WebkitTextSizeAdjust: '100%',
  MozTextSizeAdjust: '100%',
  textSizeAdjust: '100%',
})

// Reset heading font-size
globalStyle('h1, h2, h3, h4, h5, h6', {
  fontSize: 'inherit',
  fontWeight: 'inherit',
})

// Reset links
globalStyle('a', {
  color: 'inherit',
  textDecoration: 'inherit',
})

// Reset images
globalStyle('img, svg, video, canvas, audio, iframe, embed, object', {
  display: 'block',
  verticalAlign: 'middle',
})

// Make images easier to work with
globalStyle('img, video', {
  maxWidth: '100%',
  height: 'auto',
})

// Reset form elements
globalStyle('button, input, optgroup, select, textarea', {
  fontFamily: 'inherit',
  fontSize: '100%',
  lineHeight: 'inherit',
  color: 'inherit',
  margin: 0,
  padding: 0,
  backgroundColor: 'transparent',
})

globalStyle('button, [type="button"], [type="reset"], [type="submit"]', {
  WebkitAppearance: 'button',
  backgroundColor: 'transparent',
  backgroundImage: 'none',
})

// Remove border radius on form elements
globalStyle('input, button, textarea, select', {
  borderRadius: '0',
})

// Remove text transformations
globalStyle('button, select', {
  textTransform: 'none',
})

// Remove all outlines by default (you can override for accessibility)
globalStyle('*:focus', {
  outline: 'none',
})

// Tables
globalStyle('table', {
  borderCollapse: 'collapse',
  borderSpacing: 0,
})

// Prevent overflow for text
globalStyle('pre, code, kbd, samp', {
  fontFamily: 'monospace, monospace',
  fontSize: '1em',
})

// Reset sub/sup
globalStyle('sub, sup', {
  fontSize: '75%',
  lineHeight: 0,
  position: 'relative',
  verticalAlign: 'baseline',
})
globalStyle('sub', {
  bottom: '-0.25em',
})
globalStyle('sup', {
  top: '-0.5em',
})
