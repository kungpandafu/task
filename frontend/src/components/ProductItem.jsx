import React, { useState } from "react";

const ProductItem = ({
  id,
  sku,
  name,
  price,
  attributes,
  type,
  onCheckChange,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const parsedAttributes = JSON.parse(attributes);

  console.log(parsedAttributes);

  const handleOnCheckChange = () => {
    setIsChecked(!isChecked);
    onCheckChange(sku, !isChecked);
  };
  // console.log(JSON.parse(JSON.stringify(parsedAttributes.data)));
  return (
    <>
      <div class="product-container">
        <div class="check-container">
          <input
            type="checkbox"
            value={sku}
            class="delete-checkbox"
            checked={isChecked}
            onChange={handleOnCheckChange}
          />
        </div>
        <div class="sku-container">
          <p class="sku-content">{sku}</p>
        </div>
        <div class="name-container">
          <p class="name-content">{name}</p>
        </div>
        <div class="price-container">
          <p class="price-content">Price: {price} $</p>
        </div>
        <div class="data-container">
          <p class="data-content">
            {type === "book" &&
              parsedAttributes.data &&
              `Weight: ${parsedAttributes.data.weight} KG`}
            {type === "dvd" &&
              parsedAttributes.data &&
              `Size: ${parsedAttributes.data.size} MB`}
            {type === "furniture" &&
              parsedAttributes.data &&
              `Dimensions: ${
                parsedAttributes.data.height +
                "x" +
                parsedAttributes.data.width +
                "x" +
                parsedAttributes.data.customLength
              } CM`}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
