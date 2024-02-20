import React from "react";
import "./Brand.css";
import brand from "../../assets/imgs/brand.png";

const Brand = () => {
    return (
        <p className="brand">
            <img src={brand} />
        </p>
    );
};

export default Brand;