import styles from './Input.module.scss'

type Propstypes = {
 label?: string;
 name: string;
 type: string;
 placeholder?: string;
 defaultValue?: string;
 disabled?: boolean;
}

const Input = (props: Propstypes) => {
 const {label, name, type, placeholder, defaultValue, disabled} = props;
 return (
  <div className={styles.container}>
    {label && <label htmlFor={name} >{label}</label>}
    <input
      type={type}
      className={styles.container__input}
      name={name}
      id={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={disabled}
    />
</div>
 )
}

export default Input