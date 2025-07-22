import { Icon } from '@/common/components'
import type { ErrorType } from '@/pages/api'
import s from './ErrorMessage.module.css'

type ErrorMessagePropsType = {
  error: ErrorType
}

export const ErrorMessage = ({ error }: ErrorMessagePropsType) => {
  if (!error) return null

  return (
    <div className={s.errorMessage}>
      <Icon name={'error'} width={24} height={24} />
      {error}
    </div>
  )
}
