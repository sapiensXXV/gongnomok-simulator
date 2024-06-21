export default function JobSelect({
  isSelected,
  jobName,
  jobNameEng,
  changeHandler
}) {
  return (
    <>
      <button
        className={`job-select-button ${isSelected ? 'select-active' : ''}`}
        onClick={(e) => changeHandler(e, jobNameEng)}
      >
        <img src={`/images/jobs/${jobNameEng}.png`} />
        <span>{jobName}</span>
      </button>
    </>
  );

}