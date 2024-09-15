import {CDN_URL} from "../../../global/uri.js";

export default function JobCondition({
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
        <img src={`${CDN_URL}/images/jobs/${jobNameEng}.png`} />
        <span>{jobName}</span>
      </button>
    </>
  );

}