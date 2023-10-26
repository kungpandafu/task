import React from "react";

const BookFormComponent = ({ formData, setFormData }) => {
  return (
    <>
      <div className="field-group">
        <label for="weight"> WEIGHT [KG] </label>
        <input
          type="text"
          name="weight"
          id="weight"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
        />
      </div>
      <p> Please Provide Book weight in Kilograms</p>
    </>
  );
};

export default BookFormComponent;
