import { NavLink } from "react-router-dom";
import "../add/add.scss";
import { useNavigate, useParams } from "react-router";

import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../config/productStore/productStor";

export const UpdatePage = () => {
  const dispatch = useDispatch();

  let { id } = useParams();
  const { products } = useSelector(({ productRedusers }) => productRedusers);
  const [product] = products
    ? products.filter((product) => {
        if (product.id == id) {
          return product;
        } else return null;
      })
    : null;
  const edit = (value) => {
    fetch(`https://64a6fca7096b3f0fcc80ef97.mockapi.io/products/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        code: value.vendor_code,
        color: value.color,
        createdAt: value.createdAt,
        description: value.description,
        image: value.image,
        madeIn: value.brend,
        name: value.name,
        price: value.price,
        priceInSale: value.discount_price,
      }),
    })
      .then((res) => {
        dispatch(productActions.referesh());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigate = useNavigate();
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: product ? product.name : "",
      brend: product ? product.brand : "",
      vendor_code: product ? product.code : "",
      Country_of_Origin: product ? product.madeIn : "",
      Description: product ? product.description : "",
      grams: "",
      img: {},
      color: product ? product.image : "",
      price: product ? product.price : "",
      discount_price: product ? product.priceInSale : "",
    },
    onSubmit: (value) => {
      edit(value);

      (value.name = " "),
        (value.brend = ""),
        (value.vendor_code = ""),
        (value.Country_of_Origin = ""),
        (value.Description = ""),
        (value.grams = ""),
        (value.img = {}),
        (value.color = ""),
        (value.price = ""),
        (value.discount_price = "");

      navigate("/");
    },
    validate: (values) => {},
  });
  return (
    <>
      <div className="addContainer">
        <div>
          <NavLink
            to={"/"}
            state={{
              marginBottom: "10px",
            }}
            className={" back_to_main"}
          >
            Основные
          </NavLink>
        </div>
        <div className="addForm">
          <form type="submit" onSubmit={handleSubmit}>
            <div className="formMainbBox">
              <div className="inputs">
                <label htmlFor="name">Название *</label>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  className="name"
                  onChange={handleChange}
                />
                <div className="brendEndVendorCode">
                  {" "}
                  <div className="brendBox">
                    {" "}
                    <label htmlFor="brend ">Бренд * *</label>
                    <input
                      type="text"
                      name="brend"
                      value={values.brend}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="vendor_codeBox">
                    <label htmlFor="vendor_code">
                      Артикул производителя * *
                    </label>
                    <input
                      type="text"
                      value={values.vendor_code}
                      name="vendor_code"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <label htmlFor="Country_of_Origin">Страна производства *</label>
                <input
                  type="text"
                  value={values.Country_of_Origin}
                  name="Country_of_Origin"
                  className="Country_of_Origin"
                  onChange={handleChange}
                />
                <label htmlFor="Description ">Описание * *</label>{" "}
                <TextArea
                  showCount
                  maxLength={100}
                  name="Description"
                  value={values.Description}
                  onChange={handleChange}
                  style={{ height: 110, marginBottom: 24 }}
                  placeholder="can resize"
                />
                {/* <input type="text" name="Description" className="Description" /> */}
                <label htmlFor="grams">Вес с упаковкой, грамм *</label>
                <input
                  type="number"
                  name="grams"
                  value={values.grams}
                  className="grams"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="fromImgBox">
              <div className="imgBox__inputs">
                <label htmlFor="img">Фотографии *</label>
                <div className="uploadBox">
                  <PlusOutlined className="plus" />
                  <input
                    type="file"
                    className="file"
                    // value={values.img}
                    name="img"
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      // handleChange(e.target.files[0])
                    }}
                  />
                </div>
                <label htmlFor="color">Выберите цвет</label>
                <input
                  type="color"
                  className="color"
                  name="color"
                  onChange={handleChange}
                />

                <div className="Price">
                  <div>
                    <label htmlFor="">Цена</label>
                    <input
                      type="number"
                      name="Price"
                      value={values.price}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Цена со скидкой</label>
                    <input
                      type="number"
                      value={values.discount_price}
                      className="discount_price"
                      name="discount_price"
                      onChange={handleChange}
                    />
                  </div>{" "}
                </div>
              </div>
            </div>{" "}
            {/* <div className="null"></div> */}
            <div className="addFoter">
              <button
                className="SaveBtn"
                type={"submit"}
                onClick={handleSubmit}
              >
                Сохранить
              </button>
              <NavLink to={"/"} className={"CancelBtn"}>
                Отмена
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
