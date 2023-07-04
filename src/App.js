import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import styles from './App.module.css';
import Protected from './components/Protected/Protected';
import Error from './pages/Error/Error';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { useSelector } from 'react-redux';
import MyProject from './pages/MyProjects/MyProject';
import SubmitProject from './pages/SubmitProject/SubmitProject';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';
import Report from './pages/Report/Report';
import AddInvetors from './pages/AddInvestors/AddInvestors';
import useAutoLogin from "./hooks/useAutoLogin";
import Loader from "./components/Loader/Loader";

function App() {
  const isAuth = useSelector((state) => state.user.auth);
  const loading = useAutoLogin();

  return loading ? (
    <Loader text="..." />
  ) : (
    <div className={styles.container}>
      <BrowserRouter>
        <div className={styles.layout}>
          <Navbar />
          <Routes>

            <Route path='/'
              exact
              element={<Protected isAuth={isAuth}><div className={styles.main}><Home /></div></Protected>}
            />

            <Route path='/project/:id'
              exact
              element={<Protected isAuth={isAuth}><div className={styles.main}><ProjectDetails /></div></Protected>}
            />

            <Route
              path='myprojects'
              exact
              element={<Protected isAuth={isAuth}><div className={styles.main}><MyProject /></div></Protected>}
            />

            <Route
              path='submit'
              exact
              element={<Protected isAuth={isAuth}><div className={styles.main}><SubmitProject /></div></Protected>}
            />

            <Route
              path='add-investor/:id'
              exact
              element={<Protected isAuth={isAuth}><div className={styles.main}><AddInvetors /></div></Protected>}
            />

            <Route
              path='report/:id'
              exact
              element={<Protected isAuth={isAuth}><div className={styles.main}><Report /></div></Protected>}
            />

            <Route
              path='login'
              exact
              element={<div className={styles.main}>
                <Login />
              </div>}
            />

            <Route
              path='signup'
              exact
              element={<div className={styles.main}>
                <Signup />
              </div>}
            />

            <Route
              path='*'
              element={<div className={styles.main}><Error /></div>}
            />


          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
