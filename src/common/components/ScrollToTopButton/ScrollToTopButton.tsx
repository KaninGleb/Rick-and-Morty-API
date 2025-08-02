import { useEffect, useState } from 'react'
import { Icon } from '@/common/components'
import s from './ScrollToTopButton.module.css'

export const ScrollToTopButton = () => {
  const [showBtn, setShowBtn] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 150 && currentScrollY < lastScrollY) {
        setShowBtn(true)
      } else {
        setShowBtn(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  const scrollToTopHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!showBtn) {
    return null
  }

  return (
    <button className={s.scrollToTopButton} onClick={scrollToTopHandler}>
      <Icon name={'scrollToTopArrow'} height={15} width={16} />
    </button>
  )
}
