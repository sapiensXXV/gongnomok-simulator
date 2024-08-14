// eslint-disable-next-line react/prop-types
export default function RequiredStatus({ name, value }) {
  return (
    <>
      <div className='item-status-required'>
        <span className="item-status-required-description">REQ {name} </span >
        <span className='item-status-required-info'>{`: ${value}`}</span>
      </div>
    </>
  );
}