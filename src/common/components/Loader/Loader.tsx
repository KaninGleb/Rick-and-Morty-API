import s from './Loader.module.css'

export const Loader = () => (
  <div className={s.loader}>
    <div className={s.loaderAnimation}></div>
    <span>Scanning the multiverse for episodes...</span>
  </div>
)
