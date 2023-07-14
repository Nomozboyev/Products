import { NavLink } from "react-router-dom";
import { logo, myProducts, payments, profile, settings } from "../../assets";
import "./sidebar.scss";
export const Sidebar = () => {
  return (
    <>
      <div className="logoBox">
        <NavLink to={"./"}>
          <img src={logo} alt="" />
        </NavLink>
      </div>
      <div className="Sidebar_Ittem">
        <NavLink
          to={"/"}
          className={
            ((isactiv) => {
              isactiv;
            },
            "settings")
          }
        >
          <img src={settings} alt="" />
        </NavLink>
        <NavLink
          to={"/"}
          className={
            ((isactiv) => {
              isactiv ? "activeBTN profile" : "profile";
            },
            "profile")
          }
        >
          <img src={profile} alt="" />
        </NavLink>
        <NavLink
          to={"./"}
          className={
            ((isactiv) => {
              isactiv ? "activeBTN myProducts" : "myProducts";
            },
            "myProducts")
          }
        >
          <img src={myProducts} alt="" />
        </NavLink>
        <NavLink
          to={"./"}
          className={
            ((isactiv) => {
              isactiv ? "activeBTN payments" : "payments";
            },
            "payments")
          }
        >
          <img src={payments} alt="" />
        </NavLink>
      </div>
    </>
  );
};
