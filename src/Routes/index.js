// import { createBrowserHistory } from 'history'
// import { useEffect, useState } from 'react'
// import { connect, useDispatch } from 'react-redux'
// import { Route, Router, Routes } from 'react-router-dom'
// import { FullLoader } from '../Components/LoaderBox/Loader'
// import RouteWrapper from './RouteWrapper'
//
// const InnerRoutes = FullLoader(() => import('./InnerRoutes'))
// const PublicRoutes = FullLoader(() => import('./PublicRoutes'))
//
// export const history = createBrowserHistory()
//
// function Routes({ userInfo, language }) {
//   const [init, setInit] = useState(false)
//   const dispatch = useDispatch()
//
//   useEffect(() => {
//     setInit(true)
//     // apiClient
//     //   .get('language/get')
//     //   .then((response) => {
//     //     const { data } = response || {}
//     //     if (data) {
//     //       console.log('data', data)
//     //       dispatch({ type: 'SET_TRANSLATION', payload: { translations: data, language } })
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     console.error('Error fetching translations:', error)
//     //     // Handle the error appropriately here
//     //   })
//   }, [language, dispatch])
//
//   useEffect(() => {
//     getAllByLabel()
//   }, [])
//
//   function getAllByLabel() {
//     // Get all input fields
//
//     Array.from(document.querySelectorAll('label')).forEach((cont) => {
//       console.log('cont', cont)
//     })
//
//     // allLabels?.map((acc, label) => {
//     //   console.log('label', label)
//     //   console.log('acc', acc)
//     // })
//   }
//
//   const currentUser = localStorage.getItem('ACCOUNTING_USER')
//
//   return (
//     <Router history={history}>
//       {init && (
//         <Switch>
//           {(currentUser || userInfo) && (
//             <Route path="/app" render={(props) => <RouteWrapper {...props} screen={InnerRoutes} />} />
//           )}
//           <Route path="/" component={PublicRoutes} />
//         </Switch>
//       )}
//     </Router>
//   )
// }
//
// function mapStateToProps(state) {
//   return {
//     userInfo: state.users.userInfo,
//     language: state.users.language,
//     translations: state.users.translations
//   }
// }
//
// export default connect(mapStateToProps)(Routes)

import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { FullLoader } from '../Components/LoaderBox/Loader';
import RouteWrapper from './RouteWrapper';

const InnerRoutes = FullLoader(() => import('./InnerRoutes'));
const PublicRoutes = FullLoader(() => import('./PublicRoutes'));
export const history = createBrowserHistory()
function AppRoutes({ userInfo, language }) {
  const [init, setInit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setInit(true);
  }, [language, dispatch]);

  useEffect(() => {
    getAllByLabel();
  }, []);

  function getAllByLabel() {
    Array.from(document.querySelectorAll('label')).forEach((cont) => {
      console.log('cont', cont);
    });
  }

  const currentUser = localStorage.getItem('ACCOUNTING_USER');

  return (
    <BrowserRouter>
      {init && (
        <Routes>
          {(currentUser || userInfo) && (
            <Route path="/app" element={<RouteWrapper screen={InnerRoutes} />} />
          )}
          <Route path="/" element={<PublicRoutes />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

function mapStateToProps(state) {
  return {
    userInfo: state.users.userInfo,
    language: state.users.language,
    translations: state.users.translations,
  };
}

export default connect(mapStateToProps)(AppRoutes);
