import styles from './SingleItem.module.css';
import {CDN_URL} from "../../../global/uri.js";

export default function SingleItem({id, name}) {

  return (
    <>
      <button className={`${styles.item_button} ${styles.select}`} onClick={() => window.location.href = `/item/${id}`}>
        <section className={styles.item_container}>
          <img src={`${CDN_URL}/images/item/${id}.png`}></img>
          <span>{name}</span>
        </section>
      </button>
    </>
  );
} 