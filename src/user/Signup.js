import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signUp } from "../auth/helper";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSignUp = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });

    signUp({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => {
        console.log("error in signup user", err);
      });
  };

  const successMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div
          className="alert alert-success"
          style={{ display: success ? "" : "none" }}
        >
          New account was created successfully. Please{" "}
          <Link to={"/signin"}>Login Here</Link>
        </div>
      </div>
    </div>
  );

  const errorMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      </div>
    </div>
  );

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                type="text"
                value={name}
                onChange={handleChange("name")}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                type="email"
                value={email}
                onChange={handleChange("email")}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={handleChange("password")}
              />
            </div>

            <button className="btn btn-success btn-block" onClick={onSignUp}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="A page for user to signup!">
      {successMessage()}
      {errorMessage()}

      {signUpForm()}

      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default SignUp;
