import { Route, Router, Routes } from "react-router-dom";
import ItemMain from "../Item/ItemMain";
import Login from "../Login";
import ItemSimulator from "../Item/ItemSimulator";
import NewItem from "../NewItem";
import AdminPrivateRoutes from "./AdminPrivateRouter";

export default function CustomRouter() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <ItemMain/>} />
        <Route path='/login' element={ <Login/>} />
        <Route path='/item/:itemId' element={ <ItemSimulator/>} />
        <Route element={ <AdminPrivateRoutes/> }>
          <Route element={ <NewItem/> } path="/item/new" exact/>
        </Route>
      </Routes>
    </>
  )
}