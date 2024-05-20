import { Route, Router, Routes } from "react-router-dom";
import ItemMain from "../Item/ItemMain";
import Login from "../Login";
import ItemSimulator from "../Item/ItemSimulator";
import NewItem from "../NewItem";
import AdminPrivateRoutes from "./AdminPrivateRouter";
import ManageComment from "../management/comment/reports/ManageComment";

export default function CustomRouter() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <ItemMain/>} />
        <Route path='/login' element={ <Login/>} />
        <Route path='/item/:itemId' element={ <ItemSimulator/>} />
        <Route element={ <AdminPrivateRoutes/> }>
          <Route element={ <NewItem/> } path="/manage/item/new" exact/>
          <Route element={ <ManageComment/> } path="/manage/comment" exact/>
        </Route>
      </Routes>
    </>
  )
}