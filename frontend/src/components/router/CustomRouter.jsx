import { Route, Router, Routes } from "react-router-dom";
import ItemMain from "../Item/main_page/ItemMain.jsx";
import Login from "../Login";
import ItemSimulatorMain from "../Item/simulator/controller/ItemSimulatorMain.jsx";
import NewItem from "../NewItem";
import AdminPrivateRoutes from "./AdminPrivateRouter";
import ManageComment from "../management/comment/reports/ManageComment";
import ManageBanWord from "../management/banword/ManageBanWord";
import RecordManageMain from "../management/record/RecordManageMain.jsx";

export default function CustomRouter() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <ItemMain/>} />
        <Route path='/login' element={ <Login/>} />
        <Route path='/item/:itemId' element={ <ItemSimulatorMain/>} />
        <Route path='/manage/record' element={ <RecordManageMain/> } />
        <Route element={ <AdminPrivateRoutes/> }>
          <Route element={ <NewItem/> } path="/manage/item/new" exact/>
          <Route element={ <ManageComment/> } path="/manage/comment" exact/>
          <Route element={ <ManageBanWord/> } path="/manage/banword" exact/>
        </Route>
      </Routes>
    </>
  )
}