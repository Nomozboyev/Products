import { NavLink } from "react-router-dom";
import { basketImg } from "../../assets";
import "./buttonGroup.scss";
import { useDispatch } from "react-redux";
import { productActions } from "../../config/productStore/productStor";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
export const DelBtn = ({ props }) => {
  const { confirm } = Modal;
  const dispatch = useDispatch();

  const delet = (id) => {
    const a = confirm({
      title: "Are you sure delete this product?",
      icon: <ExclamationCircleFilled />,
      content: "If you delete this product, it cannot be restored",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        fetch(`https://64a6fca7096b3f0fcc80ef97.mockapi.io/products/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            dispatch(productActions.referesh());
          })
          .catch((error) => {
            console.log(error, "error");
          });
      },
      onCancel() {},
    });
  };
  return (
    <>
      <div className="delBox">
        <NavLink onClick={() => delet(props.id)}>
          <img src={basketImg} alt="basketImg" />
        </NavLink>
      </div>
    </>
  );
};
