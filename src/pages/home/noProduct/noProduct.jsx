import { NavLink } from "react-router-dom";
import { noProduct } from "../../../assets";
import "./noProduct.scss";

export const NoProduct = () => {
  return (
    <>
      <div className="noProduct">
        <h1>Вы пока не создали ни одного товара</h1>
        <img src={noProduct} alt="noProduct" />
        <NavLink to={"/"} className={"newProduct"}>
          Создать первый товар
        </NavLink>
      </div>
    </>
  );
};
