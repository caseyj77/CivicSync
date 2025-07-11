// src/theme/theme.js

const theme = {
  // colors: {
  //   primary: '#865D36', // warm oak
  //   secondary: '#AC8968', // desert clay
  //   accent: '#A69080', // dusty beige
  //   background: '#F5F3F0', // light neutral background
  //   text: '#3E362E', // deep brown
  //   muted: '#93785B', // taupe
  //   danger: '#D9534F', // alert red
  //   success: '#5CB85C', // success green
  //   info: '#5BC0DE', // info blue
  //   basic: '#ffffff', // white
  // },
  colors: {
    primary: '#FF6B6B', // flamingo red – bold, expressive
    secondary: '#4ECDC4', // tropical teal – fresh & energetic
    accent: '#FFE66D', // sunbeam yellow – playful contrast
    background: '#F7FFF7', // minty white – soft base with personality
    text: '#1A1A1A', // deep black – high contrast
    muted: '#A29BFE', // periwinkle – cool for borders & inactive UI
    danger: '#FF3B30', // bright red – clear alerts
    success: '#2ECC71', // crisp green – modern success tone
    info: '#3498DB', // clean sky blue – universal info cue
    basic: '#FFFFFF', // white – fallback neutral
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
