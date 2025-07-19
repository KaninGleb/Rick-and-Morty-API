import { SVGProps } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> {
  name: 'search' | 'error' | 'noResults' | 'previous' | 'next'
  width?: number
  height?: number
}

export const Icon = ({ name, width = 24, height = 24, ...props }: IconProps) => {
  const icons: Record<IconProps['name'], JSX.Element> = {
    search: (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),

    error: (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),

    noResults: (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),

    previous: (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
        <polyline points="15 18 9 12 15 6" />
      </svg>
    ),

    next: (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
  }

  return icons[name] || null
}
