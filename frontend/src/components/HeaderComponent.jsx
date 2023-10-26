import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";

const Header = ({ handleBulkDeleteOnClick, handleNavigateToPageAdd }) => {
  const nav = useNavigate();
  const handleCancelBtnClick = () => {
    nav("/");
  };
  return (
    <>
      <header>
        <div className="header-content-wrapper">
          <div className="page-title">
            <h2>
              {location.pathname === "/" && "Product List"}
              {location.pathname === "/products-add" && "Product Add"}
            </h2>
          </div>
          {location.pathname === "/" && (
            <div class="header-buttons">
              <button
                id="btnAdd"
                class="btn btn-primary "
                onClick={handleNavigateToPageAdd}
              >
                ADD
              </button>
              <button
                id="btnDel"
                class="btn btn-secondary"
                onClick={handleBulkDeleteOnClick}
              >
                MASS DELETE
              </button>
            </div>
          )}
          {location.pathname === "/products-add" && (
            <div className="header-buttons">
              <button
                id="btnSave"
                className="btn btn-primary"
                form="product_form"
              >
                Save
              </button>
              <button
                id="btnCancel"
                className="btn btn-secondary"
                onClick={handleCancelBtnClick}
              >
                CANCEL
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
