
import { useParams } from "react-router-dom"

export default function ItemSimulator() {

  const { itemId } = useParams();

  return (
    <>
    <h1>아이템 시뮬레이터{`id=${itemId}`}</h1>
      {/* <h1>{`id=${itemId} 아이템 시뮬레이터`}</h1> */}
    </>
  )
}