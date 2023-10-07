import React, { useEffect, useState } from "react";
import format from '../helpers/format';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/actions/cart';

export default function CartItem({item}) {
    const dispatch = useDispatch()
    const [value, setValue] = useState(item.buyQuantity)

    const handleDecrease = () => {
        if(value > 1) {
            setValue(value - 1)
        }
    }

    const handleIncrease = () => {
        //check <= availible quantity in warehouse
        if(value < item.quantity) {
            setValue(value + 1)
        }
    }

    useEffect(() => {
        dispatch(updateQuantity({_id: item._id, buyQuantity: value}))
    }, [value])

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
        <div className="d-flex align-items-center">{format.formatPrice(item.price)}</div>
      </td>

      <td>
        <div className="d-inline-flex rounded align-items-center border" style={{height: '40px', overflow: 'hidden'}}>
          <div className="btn" style={{backgroundColor: '#ddd'}} onClick={() => handleDecrease()}>
            -
          </div>
          <input type="number" value={value} readOnly style={{width: '40px', textAlign: 'center'}}/>
          <div className="btn" style={{backgroundColor: '#ddd'}} onClick={() => handleIncrease()}>
            +
          </div>
        </div>
      </td>

      <td>
        <div>
          {format.formatPrice(item.price * item.buyQuantity)}
          <button
            className="btn btn-danger"
            onClick={() => dispatch(removeFromCart({_id: item._id}))}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
