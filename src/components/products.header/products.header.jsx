import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./products.headder.scss";
import { useSelector } from "react-redux";

export const ProductsHeader = ( children) => {
  const { products } = useSelector(({ productRedusers }) => productRedusers);
  return (
    <>
      <div className="productsHeader">
        <b
        // style={{ display: "inline-block" }}
        >{` Все товары (${products.length})`}</b>
        <Input
          value={children.props}
          style={{
            width: "250px",
            height: "40px",
            textAlign: "end",
          }}
          size="midle"
          placeholder="Поиск"
          prefix={<SearchOutlined />}
        />
      </div>
    </>
  );
};
