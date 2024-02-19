import styles from './Input.module.scss'

type Propstypes = {
 label?: string;
 name: string;
 type: string;
 placeholder?: string;
}

const Input = (props: Propstypes) => {
 const {label, name, type, placeholder} = props;
 return (
  <div className={styles.container}>
    {label && <label htmlFor={name} >{label}</label>}
    <input
      type={type}
      className={styles.container__input}
      name={name}
      id={name}
      placeholder={placeholder}
    />
</div>
 )
}

export default Input