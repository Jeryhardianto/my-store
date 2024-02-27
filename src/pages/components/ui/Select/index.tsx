import styles from './Select.module.scss'

type Option = {
 label: string
 value: string,
}

type Propstypes = {
 label: string,
 name: string,
 defaultValue: string,
 disabled?: boolean,
 options: Option[],
}
const Select = (props: Propstypes) => {
 const { label, name, options, defaultValue, disabled } = props;
 return (
   <div className={styles.container}>
     <label htmlFor={name}>{label}</label>
     <select
       name={name}
       id={name}
       defaultValue={defaultValue}
       disabled={disabled}
       className={styles.container__select}
     >
       {options.map((option: any) => (
         <option key={option.value} value={option.value}>
           {option.label}
         </option>
       ))}
     </select>
   </div>
 );
}

export default Select