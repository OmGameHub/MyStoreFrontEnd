import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import {
  getAllCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({
    photo: undefined,
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    loading: false,
    error: "",
    success: false,
    getRedirect: false,
    formData: undefined,
    createdProduct: "",
  });

  const {
    photo,
    name,
    description,
    price,
    category,
    stock,
    loading,
    error,
    success,
    getRedirect,
    formData,
    createdProduct,
  } = values;

  const preload = () => {
    const { productId } = match.params;

    getAllCategories()
      .then((data) => {
        if (data?.error) {
          setValues({ ...values, error: data?.error });
        } else {
          setCategories(data);
        }
      })
      .catch((err) => {
        console.log("get all categories ", err);
      });

    getProduct(productId)
      .then((data) => {
        if (data?.error) {
          setValues({ ...values, error: data?.error });
        } else {
          setValues({
            ...values,
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category._id,
            stock: data.stock,
            formData: new FormData(),
          });
        }
      })
      .catch((err) => {
        console.log("get product error ", err);
      });
  };

  useEffect(() => {
    preload();
  }, []);

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info mt-3">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: success ? "" : "none" }}
    >
      Update {createdProduct} successfully.
    </div>
  );

  const errorMessage = () => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const goBack = () => (
    <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
      Admin Dashboard
    </Link>
  );

  const handleChange = (name) => (event) => {
    const value =
      name === "photo" ? event?.target?.files[0] : event.target.value;
    formData.set(name, value);
    console.log("formData", value, formData);
    setValues({ ...values, error: "", [name]: value });
  };

  const onUpdateProduct = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    const { productId } = match.params;
    updateProduct(productId, user._id, token, formData)
      .then((data) => {
        if (!data || data?.error) {
          setValues({ ...values, error: data?.error, loading: false });
        } else {
          setValues({
            ...values,
            formData: new FormData(),
            success: true,
            loading: false,
            createdProduct: data.name,
          });
        }
      })
      .catch((err) => {
        setValues({ ...values, loading: false });
        console.log("update product ", err);
      });
  };

  const updateProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          className="form-control"
          placeholder="Category"
          value={category}
          onChange={handleChange("category")}
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate?._id}>
                {cate?.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onUpdateProduct}
        className="btn btn-outline-success"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Update a product here!"
      description="Welcome to product update section"
      className="container bg-info p-5"
    >
      <div className="row bg-white rounded py-2">
        <div className="col-md-8 offset-md-2 mb-5">
          {loadingMessage()}
          {errorMessage()}
          {goBack()}
          {successMessage()}
          {updateProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
