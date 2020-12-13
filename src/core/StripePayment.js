import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

import { isAuthenticated } from "../auth/helper";
import { BASE_API } from "../backend";
import { emptyCart, loadCart } from "./helper/cartHelper";
import { createOrder } from "./helper/oderHelper";

const StripePayment = ({
  products,
  reload = undefined,
  setReload = (data) => data,
}) => {
  const [data, setData] = useState({
    address: "",
    loading: false,
    success: false,
    error: "",
  });

  const { user, token } = isAuthenticated();

  const getTotalAmount = () => {
    let totalAmount = 0;
    Array.isArray(products) &&
      products.forEach((p) => {
        totalAmount = totalAmount + (p?.price || 0);
      });

    return totalAmount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`${BASE_API}/payment/stripe`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((res) => {
        const { status } = res;
        console.log("makePayment response ", res);
        if (status !== 200) {
        } else {
          emptyCart(() => {});
          // createOrder(user._id, token, { products });
        }
      })
      .catch((err) => {
        console.log("makePayment error ", err);
      });
  };

  const showPaymentBtn = () => {
    return isAuthenticated() ? (
      <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_PK}
        token={makePayment}
        amount={getTotalAmount() * 100}
        currency={"INR"}
        name={"Buy Toys"}
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with stripe</button>
      </StripeCheckout>
    ) : (
      <Link to="/signin" className="btn btn-warning">
        Sign In
      </Link>
    );
  };

  return (
    <div>
      <h3>StripeCheckout {getTotalAmount()}</h3>
      {showPaymentBtn()}
    </div>
  );
};

export default StripePayment;
