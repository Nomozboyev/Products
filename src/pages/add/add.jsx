import { NavLink } from "react-router-dom";
import "./add.scss";
import { useNavigate } from "react-router";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import { PlusOutlined } from "@ant-design/icons";
 import { useDispatch } from "react-redux";
import { productActions } from "../../config/productStore/productStor";

export const Add = () => {
  const dispatch = useDispatch();
  const add = (value) => {

    fetch("https://64a6fca7096b3f0fcc80ef97.mockapi.io/products", {
      method: "POST",
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
  const { values, handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      brend: "",
      vendor_code: "",
      Country_of_Origin: "",
      Description: "",
      grams: "",
      img: {},
      color: "",
      price: "",
      discount_price: "",
    },
    onSubmit: (value) => {
      add(value);
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
    validate: (values) => {
      let error = {};
      if (!values.name) {
        error.name = "required";
        error.nameErr = true;
      }
      if (!values.brend) {
        error.brend = "required";
        error.brendErr = true;
      }
      if (!values.vendor_code) {
        error.vendor_code = "required";
        error.vendor_codeErr = true;
      }
      if (!values.Country_of_Origin) {
        error.Country_of_Origin = "required";
        error.Country_of_OriginErr = true;
      }
      if (!values.Description) {
        error.Description = "required";
        error.DescriptionErr = true;
      }
      if (!values.grams) {
        error.grams = "required";
        error.gramsErr = true;
      }
      if (!values.color) {
        error.color = "required";
        error.colorErr = true;
      }
      if (!values.price) {
        error.price = "required";
        error.priceErr = true;
      }
      if (!values.discount_price) {
        error.discount_price = "required";
        error.discount_priceErr = true;
      }
      return error;
    },
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
           <form type="submit">
             <div className="formMainbBox">
               <div className="inputs">
                 <span>
                   <label htmlFor="name">Название *</label>
                   <input
                     type="text"
                     name="name"
                     value={values.name}
                     className="name"
                     onChange={handleChange}
                   />
                   <p>{errors.name ? errors.name : null}</p>
                 </span>
                 <div className="brendEndVendorCode">
                   {" "}
                   <div className="brendBox">
                     {" "}
                     <span>
                       <label htmlFor="brend ">Бренд * *</label>
                       <input
                         type="text"
                         name="brend"
                         value={values.brend}
                         onChange={handleChange}
                       />
                       <p>{errors.brend ? errors.brend : null}</p>
                     </span>
                   </div>
                   <div className="vendor_codeBox">
                     <span>
                       <label htmlFor="vendor_code">
                         Артикул производителя * *
                       </label>
                       <input
                         type="text"
                         value={values.vendor_code}
                         name="vendor_code"
                         onChange={handleChange}
                       />
                       <p>{errors.vendor_code ? errors.vendor_code : null}</p>
                     </span>
                   </div>
                 </div>
                 <span>
                   <label htmlFor="Country_of_Origin">
                     Страна производства *
                   </label>
                   <input
                     type="text"
                     value={values.Country_of_Origin}
                     name="Country_of_Origin"
                     className="Country_of_Origin"
                     onChange={handleChange}
                   />
                   <p>
                     {errors.Country_of_Origin
                       ? errors.Country_of_Origin
                       : null}
                   </p>
                 </span>
                 <span>
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
                   <p>{errors.Description ? errors.Description : null}</p>
                 </span>

                 <span>
                   <label htmlFor="grams">Вес с упаковкой, грамм *</label>
                   <input
                     type="number"
                     name="grams"
                     value={values.grams}
                     className="grams"
                     onChange={handleChange}
                   />
                   <p>{errors.grams ? errors.grams : null}</p>
                 </span>
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
                 <span>
                   {" "}
                   <label htmlFor="color">Выберите цвет</label>
                   <input
                     type="color"
                     className="color"
                     name="color"
                     onChange={handleChange}
                   />
                   <p>{errors.color ? errors.color : null}</p>
                 </span>

                 <div className="Price">
                   <div>
                     <span>
                       <label htmlFor="">Цена</label>
                     
                       <input
                         type="number"
                         value={values.price}
                         className="price"
                         name="price"
                         onChange={handleChange}
                       />
                       <p>{errors.price ? errors.price : null}</p>
                     </span>
                   </div>
                   <div>
                     <span>
                       <label htmlFor="">Цена со скидкой</label>
                       <input
                         type="number"
                         value={values.discount_price}
                         className="discount_price"
                         name="discount_price"
                         onChange={handleChange}
                       />
                       <p>
                         {errors.discount_price ? errors.discount_price : null}
                       </p>
                     </span>
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
