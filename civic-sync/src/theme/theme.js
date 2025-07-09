// src/theme/theme.js

const theme = {
  colors: {
    primary: '#865D36', // warm oak
    secondary: '#AC8968', // desert clay
    accent: '#A69080', // dusty beige
    background: '#F5F3F0', // light neutral background
    text: '#3E362E', // deep brown
    muted: '#93785B', // taupe
    danger: '#D9534F', // alert red
    success: '#5CB85C', // success green
    info: '#5BC0DE', // info blue
    basic: '#ffffff', // white
  },
  fontSizes: {
    sm: '0.875rem',
    base: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xxl: '2rem',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '4px',
    base: '8px',
    lg: '12px',
    full: '9999px',
  },
}

export function applyThemeVars() {
  const root = document.documentElement

  // Set colors
  for (const [key, value] of Object.entries(theme.colors)) {
    root.style.setProperty(`--color-${key}`, value)
  }

  // Set font sizes
  for (const [key, value] of Object.entries(theme.fontSizes)) {
    root.style.setProperty(`--font-${key}`, value)
  }

  // Set spacing
  for (const [key, value] of Object.entries(theme.spacing)) {
    root.style.setProperty(`--space-${key}`, value)
  }

  // Set border radius
  for (const [key, value] of Object.entries(theme.borderRadius)) {
    root.style.setProperty(`--radius-${key}`, value)
  }
}

export default theme
