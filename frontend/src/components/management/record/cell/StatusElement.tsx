import styles from './StatusElement.module.css'

function StatusElement({ name, value }) {
  return (
    <>
      {
        value !== 0 &&
        // <span>{`${name} +${value}`}</span>
        <div>
          <span>{name}</span>
          <span className={styles.primary_red}>&nbsp;{`+${value}`}</span>
        </div>
      }
    </>
  )
}

export default StatusElement;