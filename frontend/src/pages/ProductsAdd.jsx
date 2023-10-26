import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../assets/product-add.css";
import Header from "../components/HeaderComponent.jsx";
import FormComponent from "../components/FormComponent.jsx";
import Footer from "../components/FooterComponent.jsx";
import apiServiceProvider from "../apiServiceProvider";

const ProductsAdd = () => {
  const nav = useNavigate();
  const productAttributes = {
    dvd: ["size"],
    book: ["weight"],
    furniture: ["height", "width", "length"],
  };
  const handleFormSubmit = async (formData, productType) => {
    const additionalProperties = productAttributes[productType];
    const productData = {
      sku: formData.sku,
      name: formData.name,
      price: formData.price,
      type: productType,
      attributes: { data: {} },
    };

    productAttributes[productType].forEach((field) => {
      if (field === "length") {
        productData.attributes.data.customLength = formData[field];
      } else {
        productData.attributes.data[field] = formData[field];
      }
    });
    console.log("Product Data:", productData);
    try {
      const newProduct = await apiServiceProvider.addProducts(productData);

      if (newProduct) {
        console.log("Operation Successful!");
        nav("/");
      } else {
        console.error("Operation Failed!");
      }
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  };

  return (
    <>
      <Header />
      <main>
        <FormComponent onFormSubmit={handleFormSubmit} />
      </main>
      <Footer />
    </>
  );
};

export default ProductsAdd;
