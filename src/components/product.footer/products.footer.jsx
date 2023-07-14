import { NavLink } from "react-router-dom"
import { PlusOutlined } from "@ant-design/icons";
import './product.footer.scss'
export const ProductsFooter=()=>
{
    return (
      <>
        <div className="productsFooter">
          <NavLink to={"/add"}className={"addProductBtn"}>
            <PlusOutlined /> Новый товар
          </NavLink>
        </div>
      </>
    );
}