import React, { useRef, useState, useEffect } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

const Card = (props) => {
  let options = props.itemQuantity;
  let price = Object.keys(options);

  //! Quantity and size of the products chosen
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  let dispatch = useDispatchCart();
  let data = useCart();

  //! Add to cart
  const handleCart = async (e) => {
    e.preventDefault();

    //! Check whether the new item id already exists in the cart or not

    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }

    //! Check whether food is not empty and the size is not changing then update and if size is also changing then simply add to cart

    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          quantity: quantity,
        });

        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          quantity: quantity,
          size: size,
          price: finalPrice,
          img: props.foodItem.img,
        });

        return;
      }

      return;
    }

    //! If food doesnot exists, then add it to the cart
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      quantity: quantity,
      size: size,
      price: finalPrice,
      img: props.foodItem.img,
    });
  };

  //! Price of the products
  let finalPrice = quantity * Number(options[size]);

  let priceRef = useRef();

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card mt-3" style={{ width: "20rem" }}>
        <img
          src={props.foodItem.img}
          style={{ height: "240px" }}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100 p-0">
            <select
              className="m-2 h-100 bg-success rounded"
              name=""
              id=""
              onChange={(e) => setQuantity(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select
              className="m-2 h-100 bg-success rounded"
              name=""
              id=""
              onChange={(e) => setSize(e.target.value)}
              ref={priceRef}
            >
              {price.map((data) => {
                return (
                  <option key={data} value={data}>
                    {" "}
                    {data}
                  </option>
                );
              })}
            </select>

            <div className=" d-inline h-100 fs-5">Rs. {finalPrice} /-</div>
          </div>
          <hr />
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handleCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
