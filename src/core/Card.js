import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  reload = undefined,
  setReload = (data) => data,
}) => {
  const [redirect, setRedirect] = useState(false);

  const title = product ? product.name : "DEFAULT Title";
  const description = product ? product.description : "DEFAULT description";
  const price = product ? product.price : "DEFAULT";

  const getRedirect = () => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const onAddToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const showAddToCart = () => {
    return (
      addToCart && (
        <button
          onClick={onAddToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const onRemoveFromCart = () => {
    removeItemFromCart(product?._id);
    setReload(!reload);
  };

  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        <button
          onClick={onRemoveFromCart}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{title}</div>
      <div className="card-body">
        {getRedirect()}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {description}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">₹ {price}</p>
        <div className="row">
          <div className="col-12">{showAddToCart()}</div>

          <div className="col-12">{showRemoveFromCart()}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
