import style from '@/components/setting/setting.module.scss'

const Categorie: React.FC<SettingCategorie> = ({ title, desc }) => {
  return (
    <div className={style.categorie}>
      <h1 className={style.title}>{title}</h1>
      <p>{desc}</p>
    </div>
  )
}

export default Categorie
