export default function JobSelect({ jobId, name, value, selectHandler }) {
  return (
    <div className="form-check form-check-inline">
      <input className="form-check-input" type="checkbox" id={jobId} value={value} onClick={selectHandler}/>
      <label className="form-check-label" htmlFor={jobId}>{name}</label>
    </div>
  )
}