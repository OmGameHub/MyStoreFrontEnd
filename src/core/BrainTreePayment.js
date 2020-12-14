import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

import { isAuthenticated } from "../auth/helper";
import { getToken, processPayment } from "./helper/brainTreeHelper";
import { emptyCart, loadCart } from "./helper/cartHelper";
import { createOrder } from "./helper/oderHelper";

const BrainTreePayment = ({
  products,
  reload = undefined,
  setReload = (data) => data,
}) => {
  const [info, setInfo] = useState({
    clientToken: null,
    loading: false,
    success: false,
    error: "",
    instance: {},
  });

  const { clientToken, loading, success, error } = info;
  const { user, token } = isAuthenticated();

  const preload = () => {
    if (!!user && !!token) {
      getToken(user._id, token)
        .then((data) => {
          console.log("get brain tree token", data);
          if (data.error) {
            setInfo({
              ...info,
              error: data.error,
            });
          } else {
            setInfo({
              ...info,
              clientToken: data.clientToken,
            });
          }
        })
        .catch((err) => {
          console.log("get token", err);
        });
    }
  };

  useEffect(() => {
    preload();
  }, []);

  const getTotalAmount = () => {
    let totalAmount = 0;
    Array.isArray(products) &&
      products.forEach((p) => {
        totalAmount = totalAmount + (p?.price || 0);
      });

    return totalAmount;
  };

  const onProcessPayment = () => {
    setInfo({
      ...info,
      loading: true,
    });

    info.instance
      ?.requestPaymentMethod()
      .then((data) => {
        const paymentInfo = {
          payment_method_nonce: data.nonce,
          amount: getTotalAmount(),
        };

        processPayment(user._id, token, paymentInfo)
          .then((data) => {
            console.log("processPayment response", data);

            setInfo({
              ...info,
              success: data.success,
              loading: false,
            });

            if (data.success) {
              const orderData = {
                products: products,
                transaction_id: data.transaction.id,
                amount: data.transaction.amount,
              };

              createOrder(user?._id, token, orderData)
                .then((data) => {
                  console.log("create order ", data);
                })
                .catch((err) => {
                  console.log("create order ", err);
                });

              emptyCart(() => {
                setReload(!reload);
              });
            }
          })
          .catch((err) => {
            console.log("process payment error", err);
            setInfo({
              ...info,
              loading: false,
            });
          });
      })
      .catch((err) => {
        console.log("requestPaymentMethod error", err);
        setInfo({
          ...info,
          loading: false,
        });
      });
  };

  if (!user || !token) {
    return (
      <div>
        <Link to="/signin" className="btn btn-warning">
          Sign In
        </Link>
      </div>
    );
  } else if (!clientToken) {
    return (
      <div>
        <h3>Loading ...</h3>
      </div>
    );
  } else {
    return (
      <div>
        <DropIn
          options={{ authorization: clientToken }}
          onInstance={(instance) => (info.instance = instance)}
        />
        <button
          className="btn btn-block btn-success"
          onClick={onProcessPayment}
        >
          Buy
        </button>
      </div>
    );
  }
};

export default BrainTreePayment;
