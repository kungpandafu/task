import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import DVDFormComponent from "./DVDFormComponent.jsx";
import BookFormComponent from "./BookFormComponent.jsx";
import FurnitureFormComponent from "./FurnitureFormComponent.jsx";

const FormComponent = ({ onFormSubmit }) => {
  const [product, setProduct] = useState("dvd");
  const initialFormData = {
    sku: "",
    name: "",
    price: "",
    size: product === "dvd" ? "" : null,
    weight: product === "book" ? "" : null,
    height: product === "furniture" ? "" : null,
    width: product === "furniture" ? "" : null,
    length: product === "furniture" ? "" : null,
  };
  const [formData, setFormData] = useState(initialFormData);

  const [genericError, setGenericError] = useState("");
  const productAttributes = {
    dvd: ["size"],
    book: ["weight"],
    furniture: ["height", "width", "length"],
  };
  const patterns = {
    sku: /^[A-Za-z0-9]*$/,
    name: /^.{1,255}$/,
    price: /^\d+(\.\d{1,2})?$/,
    size: /^\d+(\.\d{1,2})?$/,
    weight: /^\d+(\.\d{1,2})?$/,
    height: /^\d+(\.\d{1,2})?$/,
    width: /^\d+(\.\d{1,2})?$/,
    length: /^\d+(\.\d{1,2})?$/,
  };

  const validateForm = () => {
    const commonRequiredFields = ["sku", "name", "price"];
    const productRequiredFields = productAttributes[product] || [];
    const requiredFields = [...commonRequiredFields, ...productRequiredFields];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setGenericError("Please, submit required data");
        return false;
      }

      if (patterns[field] && !patterns[field].test(formData[field])) {
        setGenericError(`Please, provide the data of indicated type: ${field}`);
        return false;
      }
    }

    // Check for product-specific attributes if the product requires them
    if (productAttributes[product]) {
      const productSpecificAttributes = productAttributes[product];
      for (const attribute of productSpecificAttributes) {
        if (!formData[attribute]) {
          setGenericError(`Please, submit required data!: ${attribute}`);
          return false;
        }
        if (
          patterns[attribute] &&
          !patterns[attribute].test(formData[attribute])
        ) {
          setGenericError(
            `Please, provide the data of indicated type: ${attribute}`
          );
          return false;
        }
      }
    }

    return true;
  };

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGenericError("");

    const isFormValid = validateForm();

    if (isFormValid) {
      onFormSubmit(formData, product);
    }
  };

  const productChangeHandler = (e) => {
    setProduct(e.target.value);
  };

  return (
    <>
      <div className="form-wrapper">
        <form
          id="product_form"
          className="product-form"
          onSubmit={handleSubmit}
        >
          <div className={`field-group ${formData.sku ? "" : "error-field"}`}>
            <label htmlFor="sku">SKU</label>
            <input
              type="text"
              name="sku"
              id="sku"
              value={formData.sku}
              onChange={(e) => handleFieldChange("sku", e.target.value)}
            />
          </div>

          <div className={`field-group ${formData.name ? "" : "error-field"}`}>
            <label htmlFor="name">NAME</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
            />
          </div>

          <div className={`field-group ${formData.price ? "" : "error-field"}`}>
            <label htmlFor="price">PRICE</label>
            <input
              type="number"
              name="price"
              id="price"
              step="0.01"
              min="0"
              required
              value={formData.price}
              onChange={(e) => handleFieldChange("price", e.target.value)}
            />
          </div>

          <div className="field-group">
            <label htmlFor="productType">TYPE SWITCHER</label>
            <select
              id="productType"
              value={product}
              onChange={productChangeHandler}
            >
              <option value="dvd">DVD</option>
              <option value="book">Book</option>
              <option value="furniture">Furniture</option>
            </select>
          </div>

          {productAttributes[product].map((field) => (
            <div
              className={`field-group ${formData[field] ? "" : "error-field"}`}
              key={field}
            >
              <label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                id={field}
                value={formData[field]}
                onChange={(e) => handleFieldChange(field, e.target.value)}
              />
            </div>
          ))}

          {genericError && <div className="error">{genericError}</div>}
        </form>
      </div>
    </>
  );
};

export default FormComponent;
