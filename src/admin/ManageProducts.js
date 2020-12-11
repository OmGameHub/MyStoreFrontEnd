import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { deleteProduct, getAllProducts } from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllProducts()
      .then((data) => {
        if (data && data.error) {
          setError(data.error);
        } else {
          console.log("getAllProducts data", data);
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

  const onDeleteProduct = (productId) => {
    deleteProduct(productId, user._id, token)
      .then((data) => {
        if (data && data.error) {
          setError(data.error);
        } else {
          let newProducts = products.filter(
            (product) => product._id !== productId
          );
          setProducts(newProducts);
        }
      })
      .catch((err) => {
        console.log("delete product error: ", productId, err);
      });
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {products.length} products
          </h2>

          {Array.isArray(products) &&
            products.map(
              (product) =>
                product && (
                  <div key={product._id} className="row text-center mb-2 ">
                    <div className="col-4">
                      <h3 className="text-white text-left">{product.name}</h3>
                    </div>
                    <div className="col-4">
                      <Link
                        className="btn btn-success"
                        to={`/admin/product/update/${product._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </div>
                    <div className="col-4">
                      <button
                        onClick={() => onDeleteProduct(product._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
