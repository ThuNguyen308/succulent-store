import React, { useEffect, useState } from "react";
import format from "../helpers/format";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/actions/cart";
import QuantityControl from "./QuantityControl";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(item.buyQuantity);

  useEffect(() => {
    dispatch(updateQuantity({ _id: item._id, buyQuantity: value }));
  }, [value]);

  return (
    <tr key={item._id}>
      <td>
        <div className="d-flex align-items-center g-1">
          <img
            src={
              process.env.REACT_APP_API +
              `api/v1/product/product-photo/${item._id}`
            }
            className="product-img"
            width="50"
          />
          <p>{item.name}</p>
        </div>
      </td>

      <td>
        <div className="d-flex align-items-center">
          {format.formatPrice(item.price)}
        </div>
      </td>

      <td>
        <QuantityControl
          value={value}
          setValue={setValue}
          maxValue={item?.quantity}
        />
      </td>

      <td>
        <div>
          {format.formatPrice(item.price * item.buyQuantity)}
          <button
            className="btn btn-danger"
            style={{ marginLeft: "4px" }}
            onClick={() => dispatch(removeFromCart({ _id: item._id }))}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
