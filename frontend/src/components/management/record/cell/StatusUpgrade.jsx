import StatusElement from "./StatusElement.jsx";
import styles from "./StatusUpgrade.module.css";

function StatusUpgrade({ status }) {
  return (
    <>
      <main className={styles.main_flex}>
        <StatusElement name={'STR'} value={status.str}/>
        <StatusElement name={'DEX'} value={status.dex}/>
        <StatusElement name={'INT'} value={status.intel}/>
        <StatusElement name={'LUK'} value={status.luk}/>
        <StatusElement name={'공격력'} value={status.phyAtk}/>
        <StatusElement name={'물리방어력'} value={status.phyDef}/>
        <StatusElement name={'마력'} value={status.mgAtk}/>
        <StatusElement name={'마법방어력'} value={status.mgDef}/>
        <StatusElement name={'회피율'} value={status.avo}/>
        <StatusElement name={'명중률'} value={status.acc}/>
        <StatusElement name={'이동속도'} value={status.move}/>
        <StatusElement name={'점프력'} value={status.jump}/>
        <StatusElement name={'HP'} value={status.hp}/>
        <StatusElement name={'MP'} value={status.mp}/>
      </main>
    </>
  ); 
}

export default StatusUpgrade;