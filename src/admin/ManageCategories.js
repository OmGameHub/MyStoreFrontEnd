import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { deleteCategory, getAllCategories } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllCategories()
      .then((data) => {
        if (data && data.error) {
          setError(data.error);
        } else {
          setCategories(data);
        }
      })
      .catch((err) => {
        console.log("get all categories error: ", err);
      });
  };

  useEffect(() => {
    preload();
  }, []);

  const onDeleteCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token)
      .then((data) => {
        if (data && data.error) {
          setError(data.error);
        } else {
          let newCategories = categories.filter(
            (category) => category._id !== categoryId
          );
          setCategories(newCategories);
        }
      })
      .catch((err) => {
        console.log("delete category error: ", categoryId, err);
      });
  };

  return (
    <Base title="Welcome admin" description="Manage categories here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {categories.length} categories
          </h2>

          {Array.isArray(categories) &&
            categories.map(
              (category) =>
                category && (
                  <div key={category._id} className="row text-center mb-2 ">
                    <div className="col-4">
                      <h3 className="text-white text-left">{category.name}</h3>
                    </div>
                    <div className="col-4">
                      <Link
                        className="btn btn-success"
                        to={`/admin/category/update/${category._id}`}
                      >
                        <span className="">Update</span>
                      </Link>
                    </div>
                    <div className="col-4">
                      <button
                        onClick={() => onDeleteCategory(category._id)}
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

export default ManageCategories;
