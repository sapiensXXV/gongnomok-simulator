import ShortcutInfo from "./ShortcutInfo.jsx";

function ShortcutBanner() {
  return (
    <section className="shortcut-guide-section bg-success">
      <span className="shortcut-title">단축키</span>
      <div className="shortcut-info">
        <ShortcutInfo description='Q-10%적용'/>
        <ShortcutInfo description='W-60%적용'/>
        <ShortcutInfo description='E-100%적용'/>
        <ShortcutInfo description='R-아이템 리셋'/>
        <ShortcutInfo description='F-구매기록 리셋'/>
      </div>
    </section>
  )
}

export default ShortcutBanner;