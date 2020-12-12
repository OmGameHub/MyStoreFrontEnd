import React, { useState, useEffect } from "react";
import "../styles.css";

import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreApiCalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const preload = () => {
    getAllProducts()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.log("get all products error: ", err);
      });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to My Store">
      <div className="col text-center">
        <h1 className="text-white">All products</h1>

        <div className="row">
          {products.map((product) => (
            <div key={product?._id} className="col-4 md-4">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default Home;
