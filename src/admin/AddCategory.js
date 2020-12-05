import React, { useState } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, token } = isAuthenticated();

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
      Category created successfully.
    </div>
  );

  const errorMessage = () => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
    >
      Failed to create category
    </div>
  );

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
        Admin Dashboard
      </Link>
    </div>
  );

  const onCreateCategory = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    createCategory(user._id, token, { name })
      .then((data) => {
        console.log("data", data);
        setLoading(false);
        if (!data || !!data?.error) {
          setError(data.error);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("on create category error", err);
      });
  };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const createCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          autoFocus
          required
          placeholder="For Ex. Summer"
          value={name}
          onChange={handleChange}
        />

        <button className="btn-outline-info" onClick={onCreateCategory}>
          Create category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create new category here"
      description="Add a new category for product"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {loadingMessage()}
          {successMessage()}
          {errorMessage()}
          {createCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
