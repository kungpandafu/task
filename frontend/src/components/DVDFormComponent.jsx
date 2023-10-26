import React, { useState } from "react";

const DVDFormComponent = ({ formData, setFormData }) => {
  return (
    <>
      <div className="field-group">
        <label for="size"> SIZE [MB] </label>
        <input
          type="text"
          name="size"
          id="size"
          value={formData.size}
          onChange={(e) => setFormData({ ...formData, size: e.target.value })}
        />
      </div>
      <p> Please Provide DVD disk size in Megabytes</p>
    </>
  );
};

export default DVDFormComponent;
