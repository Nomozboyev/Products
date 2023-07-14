import { NavLink } from "react-router-dom";
import { updateImg } from "../../assets";
import "./buttonGroup.scss";
 export const Update  = ({ props }) => {
   return (
    <>
      <div className="updateBox">
        <NavLink to={`edit/${props.id}`}  >
          <img src={updateImg} alt="basketImg" />
        </NavLink>
      </div>
    </>
  );
};
