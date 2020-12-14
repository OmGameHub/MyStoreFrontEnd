import React, { useState, useEffect } from "react";
import "../styles.css";

import Base from "./Base";
import Card from "./Card";
// import StripePayment from "./StripePayment";
import { loadCart } from "./helper/cartHelper";
import BrainTreePayment from "./BrainTreePayment";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [error, setError] = useState("");

  const preload = () => {
    setProducts(loadCart() || []);
  };

  useEffect(() => {
    preload();
  }, [reload]);

  const productsContainer = () => (
    <div>
      <h2>This section load all products</h2>

      <div className="row">
        {Array.isArray(products) &&
          products.map((product, index) => (
            <div key={`${product?._id}_${index}`} className="col-4 md-4">
              <Card
                product={product}
                addToCart={false}
                removeFromCart={true}
                reload={reload}
                setReload={setReload}
              />
            </div>
          ))}
      </div>
    </div>
  );

  const paymentContainer = () => {
    // return (
    //   <StripePayment
    //     products={products}
    //     reload={reload}
    //     setReload={setReload}
    //   />
    // );

    return (
      <BrainTreePayment
        products={products}
        reload={reload}
        setReload={setReload}
      />
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        {products.length == 0 ? (
          <div className="col">
            <h3>Cart is empty</h3>
          </div>
        ) : (
          <>
            <div className="col-8">{productsContainer()}</div>
            <div className="col-4">{paymentContainer()}</div>
          </>
        )}
      </div>
    </Base>
  );
};

export default Cart;
