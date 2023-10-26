import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import ProductsPage from "./pages/ProductsPage";
import ProductsAdd from "./pages/ProductsAdd";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="products-add" element={<ProductsAdd />} />
      </Routes>
    </>
  );
}

export default App;
