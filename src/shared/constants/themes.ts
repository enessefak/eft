export const enum COLORS {
  TRANSPARENT = 'transparent',
  PRIMARY = '#f27a1b'
}

const LIGHT_THEME = {
  ...COLORS
}

const DARK_THEME = {
  ...LIGHT_THEME
}

export const THEME = {
  DARK: DARK_THEME,
  LIGHT: LIGHT_THEME
}

export const enum breakpoints {
  xxs = '360px',
  xs = '480px',
  sm = '768px',
  md = '992px',
  lg = '1200px',
  xl = '1400px'
}
