import React from "react";
import Base from "./Base";
import { BASE_API } from "../backend";
import "../styles.css";

const Home = () => {
  return (
    <Base title="Home Page" description="Welcome to My Store">
      <h1 className="text-white">Hello om</h1>
    </Base>
  );
};

export default Home;
