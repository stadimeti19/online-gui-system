import React, { useState } from "react";

const StoredProcedureTemplate = ({ title, procedureName, parameters, onSubmit, onCancel, buttonText = "Submit" }) => {
  const initialState = parameters.reduce((acc, param) => {
    acc[param.name] = param.defaultValue || "";
    return acc;
  }, {});
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(procedureName, formData); // Pass data to parent
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Procedure: {title}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gap: "10px" }}>
          {parameters.map((param, index) => (
            <div key={index}>
              <label>{param.name}</label>
              {param.dropdownOptions ? (
                <select
                  name={param.name}
                  value={formData[param.name]}
                  onChange={handleChange}
                  required={param.required}
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    width: "100%",
                    marginTop: "5px",
                  }}
                >
                  <option value="">Select an option</option>
                  {param.dropdownOptions.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={param.type || "text"}
                  name={param.name}
                  placeholder={param.placeholder || param.name}
                  value={formData[param.name]}
                  onChange={handleChange}
                  required={param.required}
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    width: "100%",
                    marginTop: "5px",
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ccc",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoredProcedureTemplate;
