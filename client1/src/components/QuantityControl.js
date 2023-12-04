import React from "react";

export default function QuantityControl({ value, setValue, maxValue }) {
  const handleDecrease = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const handleIncrease = () => {
    //check <= availible quantity in warehouse
    if (value < maxValue) {
      setValue(value + 1);
    }
  };
  return (
    <div
      className="d-inline-flex rounded align-items-center border"
      style={{ height: "40px", overflow: "hidden" }}
    >
      <div
        className="btn"
        style={{ backgroundColor: "#ddd", height: "100%" }}
        onClick={() => handleDecrease()}
      >
        -
      </div>
      <input
        type="number"
        value={value}
        readOnly
        style={{ width: "40px", height: "100%", textAlign: "center" }}
      />
      <div
        className="btn"
        style={{ backgroundColor: "#ddd", height: "100%" }}
        onClick={() => handleIncrease()}
      >
        +
      </div>
    </div>
  );
}
