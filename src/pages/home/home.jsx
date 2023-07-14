// import { NoProduct } from "./noProduct";
import "./home.scss";
import { Product } from "./product";
export const Home = () => {
  return (
    <>
      <div className="home">
        {/* <NoProduct /> */}
        <Product />
      </div>
    </>
  );
};
