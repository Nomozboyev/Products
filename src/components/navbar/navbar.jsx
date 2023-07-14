import { useDispatch, useSelector } from "react-redux";
import { logout, payments } from "../../assets";
import "./navbar.scss";
import { productActions } from "../../config/productStore/productStor";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export const Navbar = () => {
  let dispatch = useDispatch();
  let { token } = useSelector(({ productRedusers }) => productRedusers);
  let logoutfuncsion = () => {
    localStorage.clear("token");
    dispatch(productActions.token(""));
  };
  let pathname = useLocation().pathname;
  let pathnames = pathname.split("/").filter((pathname) => pathname);
  return (
    <>
      <div className="breadcrumbsBox">
        <Breadcrumb>
          {pathnames.length > 0 ? (
            <Breadcrumb.Item>
              <Link to={"/"}>
                {" "}
                <HomeOutlined />
              </Link>
            </Breadcrumb.Item>
          ) : (
            <>
              <Breadcrumb.Item>
                <Link to={"/"}>
                  {" "}
                  <HomeOutlined />
                </Link>
              </Breadcrumb.Item>
            </>
          )}

          {pathnames.map((name, index) => {
            const routeTo = `${pathnames.slice(0, index + 1).join("/")}`;
            const islast = index == payments.length - 1;

            return islast ? (
              <Breadcrumb.Item key={index}>{name}</Breadcrumb.Item>
            ) : (
              <Breadcrumb key={index}>
                <Link
                  to={routeTo}
                  style={{
                    marginRight: "5px",
                  }}
                >
                  {name}
                </Link>
              </Breadcrumb>
            );
          })}
        </Breadcrumb>
      </div>
      <div className="loginBtn">
        {token ? (
          <button onClick={logoutfuncsion}>
            <img src={logout} alt="logouticon" />
            Выйти
          </button>
        ) : (
          <button disabled>
            <img src={logout} alt="logouticon" />
            Выйти
          </button>
        )}
      </div>
    </>
  );
};
