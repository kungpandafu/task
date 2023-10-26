import React from "react";

const FurnitureFormComponent = ({ formData, setFormData }) => {
  return (
    <>
      <div className="field-group">
        <label for="height"> Height [CM] </label>
        <input
          type="text"
          name="height"
          id="height"
          value={formData.height}
          onChange={(e) => setFormData({ ...formData, height: e.target.value })}
        />
      </div>
      <div className="field-group">
        <label for="width"> Width [CM] </label>
        <input
          type="text"
          name="width"
          id="width"
          value={formData.width}
          onChange={(e) => setFormData({ ...formData, width: e.target.value })}
        />
      </div>
      <div className="field-group">
        <label for="length"> Length [CM] </label>
        <input
          type="text"
          name="length"
          id="length"
          value={formData.length}
          onChange={(e) => setFormData({ ...formData, length: e.target.value })}
        />
      </div>
      <p> Please provide Furniture Dimensions in HxWxL format.</p>
    </>
  );
};

export default FurnitureFormComponent;
