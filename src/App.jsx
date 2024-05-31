import React, { useEffect, useState } from "react";
import CartCard from "./Components/CartCard";
import "./assets/style.css";
import { saveAllProducts, quantityChange, updateSubTotal, updateTotal, removeItem } from "./Redux/Reducers/Cart";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatcher = useDispatch();
  const { items = [], subTotal = 0, total = 0 } = useSelector((store) => store.Cart);
  const shipping = 20; // Fixed shipping cost

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((result) => {
        dispatcher(saveAllProducts(result.products));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatcher]);

  useEffect(() => {
    let newSubTotal = 0;
    items.forEach((element) => {
      newSubTotal += element.price * element.quantity;
    });
    dispatcher(updateSubTotal(newSubTotal));
    let newTotal = newSubTotal + shipping; // Include shipping in the total
    dispatcher(updateTotal(newTotal));
  }, [items, dispatcher, shipping]);

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="cart-items-container py-5 divider">
        {items.map((item, index) => (
          <CartCard
            key={`${item.title}-${index}`}
            data={item}
            dispatcher={dispatcher}
            quantityChange={quantityChange}
            removeItem={(id) => dispatcher(removeItem(id))}
          />
        ))}
      </div>
      <div className="py-5 divider">
        <div className="row mb-3">
          <div className="col-6">SUBTOTAL</div>
          <div className="col-6 d-flex justify-content-end">
            <b>${subTotal}</b>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">SHIPPING</div>
          <div className="col-6 d-flex justify-content-end">
            <b>${shipping > 0 ? shipping : "FREE"}</b>
          </div>
        </div>
        <div className="row">
          <div className="col-6">TOTAL</div>
          <div className="col-6 d-flex justify-content-end">
            <b>${subTotal + shipping}</b> {/* Show the grand total */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
