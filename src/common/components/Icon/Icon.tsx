import { type SVGProps, type ReactElement } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> {
  name: 'search' | 'error' | 'noResults' | 'previous' | 'next' | 'scrollToTopArrow'
  width?: number
  height?: number
}

export const Icon = ({ name, width = 24, height = 24, ...props }: IconProps) => {
  const icons: Record<IconProps['name'], ReactElement> = {
    search: (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),

    error: (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 8V12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 16.01L12.01 15.9989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    ),

    noResults: (
      <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="15" x2="12.01" y2="17" />
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

    scrollToTopArrow: (
      <svg width={width} height={height} viewBox="0 0 15 16" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
        <path d="M6.80722 4.2806V15H9.19278V4.2806L14.3134 9.08118L16 7.5L8 0L0 7.5L1.6866 9.08118L6.80722 4.2806Z" fill='black'/>
      </svg>
    ),
  }

  return icons[name] || null
}
