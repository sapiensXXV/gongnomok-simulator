function RecordTitle({ name }) {
  return (
    <>
      <span className="item-best-record-title">최고기록{name?.length > 0 && ` (이름: ${name})`}</span>
    </>
  )
}

export default RecordTitle;