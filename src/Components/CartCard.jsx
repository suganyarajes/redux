import React from "react";
import { Button } from "reactstrap";
import Accordion from "./Accordian";
import PropTypes from "prop-types";

export default function CartCard({
  data = {},
  dispatcher = () => {},
  quantityChange = () => {},
  removeItem = () => {},
}) {
  const handleQuantityChange = (value) => {
    dispatcher(quantityChange({ id: data.id, value }));
  };

  const handleRemove = () => {
    const newQuantity = Math.max(1, data.quantity - 1);
    handleQuantityChange(newQuantity);
  };

  return (
    <div className="row mb-3">
      <div className="col-12 col-md-6">
        <div className="row">
          <div className="col-4 col-sm-3">
            <img
              className="product_image img-fluid"
              src={data.image}
              alt={data.title}
            />
          </div>
          <div className="col-8 col-sm-9">
            <h4 className="mb-4 mt-4">{data.title}</h4>
            <Accordion
              options={[
                {
                  title: "Details",
                  description: data.details,
                },
                {
                  title: "Sustainability",
                  description: data.sustainability,
                },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <div className="d-flex align-items-center">
              <Button
                type="button"
                color="link"
                onClick={() => handleQuantityChange(Math.max(1, data.quantity - 1))}
                disabled={data.quantity <= 1}
              >
                -
              </Button>
              <select
                value={data.quantity}
                className="quantity_changer"
                onChange={(e) =>
                  handleQuantityChange(parseInt(e.target.value, 10))
                }
              >
                {[...Array(10).keys()].map((i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <Button
                type="button"
                color="link"
                onClick={() => handleQuantityChange(data.quantity + 1)}
              >
                +
              </Button>
            </div>
            <h5 className="ml-3">${data.price * data.quantity}</h5>
          </div>
          <div className="col-12 d-flex justify-content-end">
            <Button type="button" color="link" onClick={handleRemove}>
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

CartCard.propTypes = {
  data: PropTypes.object,
  dispatcher: PropTypes.func,
  quantityChange: PropTypes.func,
  removeItem: PropTypes.func,
};
