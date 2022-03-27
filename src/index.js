import React from "react";
import ReactDOM from "react-dom";
// import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./index.css";
import Home from "./Home";
import DoctorRegister from "./Component/DoctorRegister";
import UserRegister from "./Component/UserRegister";
import Login from "./Component/Login";
import Result from "./Component/Result";
import UserProfile from "./Component/UserProfile";
import Header from "./Component/Header";
import reportWebVitals from "./reportWebVitals";
import About from "./Component/About";
import Header2 from "./Component/Header2";
import Footer from "./Component/Footer";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Provider from "./Provider";
// import BackToTopBtn from "./Component/BackTopBtn"

const PublicHeader = () => (
  <div>
    <Routes>
      <Route element={<Header />}>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/result" element={<Result />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/doctor-register" element={<DoctorRegister />}></Route>
        <Route path="/user-register" element={<UserRegister />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Route>
    </Routes>
  </div>
);
const SpecialHeader = () => (
  <div className="">
    <Routes>
      <Route element={<Header2 />}>
        <Route
          exact
          path="/userprofile"
          element={
            <RequireAuth redirectTo="/login">
              <UserProfile />
            </RequireAuth>
          }
        ></Route>
      </Route>
    </Routes>
  </div>
);

ReactDOM.render(
  <Provider>
    <BrowserRouter>
      <PublicHeader />
      <SpecialHeader />
      <Footer />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

function RequireAuth({ children, redirectTo }) {
  // let isAuthenticated = getAuth();
  let isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

reportWebVitals();
