
import Header from './components/Header';
import { RecoilRoot } from 'recoil';
import CustomRouter from './components/router/CustomRouter';
import SessionCheck from './components/session/SessionCheck';

// function authAdmin() {
//   return new Promise(function (resolve, reject) {
//     axios
//       .get(`${BASE_URI}/api/auth/admin`, { withCredentials: true })
//       .then((response) => {
//         resolve(response);
//       })
//       .catch((err) => {
//         // reject(new Error("Admin authentication failed"));
//         reject(err);
//       })
//   })
// }

// function isAdmin() {
//   authAdmin()
//     .then(function (response) {
//       console.log(response);
//       return true;
//     })
//     .catch(function (err) {
//       console.log(err);
//       return false;
//     })
// }

function App() {

  return (
    <>
      <RecoilRoot>
        <SessionCheck/>
        <Header />
        <CustomRouter/>
      </RecoilRoot>
    </>
  );
}

export default App
