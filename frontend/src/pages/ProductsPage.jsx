import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../components/HeaderComponent";
import Footer from "../components/FooterComponent";
import ProductItem from "../components/ProductItem";

import "../assets/product-list.css";
import apiServiceProvider from "../apiServiceProvider";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    apiServiceProvider
      .getProducts()
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error(`API returned non-array data: ${data}`);
        }
      })
      .catch((err) => {
        console.error(`Error Fetching: ${err}`);
      });
  }, []);
  const nav = useNavigate();

  const handleNavigateToPageAdd = () => {
    nav("/products-add");
  };
  const handleOnCheckChange = (sku, isChecked) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [sku]: isChecked,
    }));
  };
  const handleBulkDeleteOnClick = () => {
    const itemsToDelete = Object.keys(selectedItems).filter(
      (sku) => selectedItems[sku]
    );
    apiServiceProvider.deleteProducts(itemsToDelete).then((isDeleted) => {
      if (isDeleted) {
        apiServiceProvider
          .getProducts()
          .then((data) => {
            if (Array.isArray(data)) {
              setProducts(data);
            } else {
              console.error(`API returned non-array data: ${data}`);
            }
          })
          .catch((err) => {
            console.error(` Error Deleting!: ${err}`);
          });
      }
    });
  };
  return (
    <>
      <Header
        handleNavigateToPageAdd={handleNavigateToPageAdd}
        handleBulkDeleteOnClick={handleBulkDeleteOnClick}
      />
      <main>
        <div class="products-list-wrapper">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <ProductItem
                key={product.sku}
                {...product}
                onCheckChange={handleOnCheckChange}
              />
            ))
          ) : (
            <p>Nothing left ! :( </p>
          )}
        </div>
        ;
      </main>
      <Footer />
    </>
  );
};

export default ProductsPage;
