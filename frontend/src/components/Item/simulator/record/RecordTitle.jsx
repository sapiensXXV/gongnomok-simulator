import styles from './RecordTitle.module.css';

function RecordTitle({ name, tries }) {
  return (
    <>
      <span className={styles.title}>최고기록</span>
      <section className={styles.bottom_margin_3}>
        {/*<span className={styles.discription}>[</span>*/}
        <span className={`${styles.discription} ${styles.primary_red}` }>{name}</span>
        <span className={styles.discription}>{` 님이`}</span><br/>
        <span className={`${styles.discription} ${styles.primary_red}`}>{`${tries}`}</span>
        <span className={`${styles.discription}`}>{` 번의 시도로 만들어낸`}</span>
      </section>
    </>
  )
}

export default RecordTitle;