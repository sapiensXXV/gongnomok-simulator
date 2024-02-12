import { Link } from "react-router-dom"; 

export default function RouteTest() {
  return (
    <>
      <Link to={"/"}>Home</Link> <br/>
      <Link to={"/login"}>Login</Link> <br/>
    </>
  )
}

