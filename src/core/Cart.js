import React, { useState, useEffect } from "react";
import "../styles.css";

import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";

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
          products.map((product) => (
            <div key={product?._id} className="col-4 md-4">
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

  const checkoutContainer = () => (
    <div>
      <h2>This section checkout</h2>
    </div>
  );

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-8">{productsContainer()}</div>
        <div className="col-4">{checkoutContainer()}</div>
      </div>
    </Base>
  );
};

export default Cart;
