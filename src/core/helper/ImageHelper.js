import React from "react";
import { BASE_API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageUrl = !!product?._id
    ? `${BASE_API}/product/photo/${product?._id}`
    : "https://images.pexels.com/photos/4091/woman-dropped-fail-failure.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500";

  return (
    <div className="rounded border border-success p-2">
      <img
        src={imageUrl}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
    </div>
  );
};

export default ImageHelper;
