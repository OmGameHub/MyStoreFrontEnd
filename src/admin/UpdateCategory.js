import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getCategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, token } = isAuthenticated();

  const preload = () => {
    const { categoryId } = match.params;
    setLoading(true);
    getCategory(categoryId)
      .then((data) => {
        if (data?.error) {
          setError(data?.error);
        } else {
          setName(data?.name);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("get category error ", err);
        setLoading(false);
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
      Category update successfully.
    </div>
  );

  const errorMessage = () => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
    >
      Failed to update category
    </div>
  );

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
        Admin Dashboard
      </Link>
    </div>
  );

  const onUpdateCategory = (event) => {
    const { categoryId } = match.params;

    event.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    updateCategory(categoryId, user._id, token, { name })
      .then((data) => {
        console.log("data", data);
        setLoading(false);
        if (!data || !!data?.error) {
          setError(data.error);
        } else {
          setError("");
          setSuccess(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("on update category error", err);
      });
  };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const categoryForm = () => (
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
          disabled={loading}
        />

        <button
          className="btn-outline-info"
          onClick={onUpdateCategory}
          disabled={loading}
        >
          Update category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Update category here"
      description="Update category for product"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {loadingMessage()}
          {successMessage()}
          {errorMessage()}
          {categoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
