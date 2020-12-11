import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { createProduct, getAllCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    photo: undefined,
    name: "",
    description: "",
    price: "",
    categories: [],
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
    categories,
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
    getAllCategories()
      .then((data) => {
        if (data?.error) {
          setValues({ ...values, error: data?.error });
        } else {
          setValues({ ...values, categories: data, formData: new FormData() });
        }
      })
      .catch((err) => {
        console.log("get all categories ", err);
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
      Add {createdProduct} successfully.
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

  const onCreateProduct = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData)
      .then((data) => {
        if (!data || data?.error) {
          setValues({ ...values, error: data?.error, loading: false });
        } else {
          setValues({
            ...values,
            photo: undefined,
            name: "",
            description: "",
            price: "",
            category: "",
            stock: "",
            getRedirect: false,
            formData: new FormData(),
            success: true,
            loading: false,
            createdProduct: data.name,
          });
        }
      })
      .catch((err) => {
        setValues({ ...values, loading: false });
        console.log("create product ", err);
      });
  };

  const createProductForm = () => (
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
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate) => (
              <option value={cate?._id}>{cate?.name}</option>
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
        onClick={onCreateProduct}
        className="btn btn-outline-success"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-5"
    >
      <div className="row bg-white rounded py-2">
        <div className="col-md-8 offset-md-2 mb-5">
          {loadingMessage()}
          {errorMessage()}
          {goBack()}
          {successMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
