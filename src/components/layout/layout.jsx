import { Route, Routes } from "react-router";
import { Navbar } from "../navbar/navbar";
import { Home } from "../../pages/home";
import { Add } from "../../pages/add/add";
import { Sidebar } from "../sidebar/sidebar";
import "./layout.scss";
import { UpdatePage } from "../../pages/update/updatePage";
 import { Login } from "../../pages/loginPage/loginPage";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../config/productStore/productStor";
import { useEffect } from "react";
 export const Layout = () => {
  let dispatch=useDispatch();
  let {token}= useSelector(({productRedusers}) =>productRedusers  )
   
     useEffect(() => {
       let getToken = localStorage.getItem("token");
       dispatch(productActions.token(getToken));
     }, [token]);
  
  return (
    <>
      <div className="container">
        <div className="sidebarBox">
          <Sidebar />
        </div>
        <div className="boxRight">
          <div className="navbarBox">
            <Navbar />
          </div>
          <div className="pagesContainer">
            <Routes>
              {token ? (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/add" element={<Add />} />
                  <Route path="edit/:id" element={<UpdatePage />} />
 
                  <Route path="*" element={"error"} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Login />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};
