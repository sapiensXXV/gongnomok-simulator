interface Props {
  name: string
  value: number | undefined
}

export default function RequiredStatus({ name, value }: Props) {
  return (
    <div className="item-status-required">
      <span className="item-status-required-description">REQ {name} </span>
      <span className="item-status-required-info">{`: ${value}`}</span>
    </div>
  )
}
