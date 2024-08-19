import styles from './RecordObserveTrigger.module.css';

function RecordObserveTrigger({ target }) {
  return (
    <>
      <div className={styles.target} ref={target}></div>
    </>
  )
}

export default RecordObserveTrigger;