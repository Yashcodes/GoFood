import React from "react";

const Card = (props) => {
  let options = props.itemQuantity;
  let price = Object.keys(options);

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={props.itemImg}
          style = {{height : "240px"}}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.itemName}</h5>
          <div className="container w-100 ">
            <select className="m-2 h-100 bg-success rounded" name="" id="">
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select className="m-2 h-100 bg-success rounded" name="" id="">
              {price.map((data) => {
                return (
                  <option key={data} value={data}>
                    {" "}
                    {data}
                  </option>
                );
              })}
            </select>

            <div className=" d-inline h-100 fs-5">Total Price</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
