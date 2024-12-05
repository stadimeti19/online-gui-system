// components/StoredProcedureTemplate.js
import React, { useState, useEffect } from "react";
import { executeProcedure, fetchOptions } from "../utils/api";

const StoredProcedureTemplate = ({
  title,
  procedureName,
  parameters,
  onCancel,
  buttonText = "Submit",
}) => {
  const initialState = parameters.reduce((acc, param) => {
    acc[param.name] = param.defaultValue || "";
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);
  const [updatedParameters, setUpdatedParameters] = useState(parameters); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchAllOptions = async () => {
      const newParameters = await Promise.all(
        parameters.map(async (param) => {
          if (param.fetchOptions) {
            try {
              const options = await fetchOptions(param.fetchOptions);
              return { ...param, dropdownOptions: options };
            } catch (err) {
              console.error(`Error fetching options for ${param.name}:`, err);
              return param;
            }
          } else {
            return param;
          }
        })
      );
      setUpdatedParameters(newParameters);
    };

    fetchAllOptions();
  }, [parameters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Replace empty strings with null for backend compatibility
    const sanitizedFormData = {};
    for (const key in formData) {
      sanitizedFormData[key] = formData[key] === "" ? null : formData[key];
    }

    try {
      const result = await executeProcedure(procedureName, Object.values(sanitizedFormData));
      console.log("Procedure executed successfully:", result);
      onCancel(); // Navigate back to dashboard
    } catch (err) {
      console.error("Error executing procedure:", err);
      setError("Failed to execute procedure. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Procedure: {title}</h2>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gap: "10px" }}>
          {updatedParameters.map((param, index) => (
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
                    <option key={idx} value={option.value || option}>
                      {option.label || option}
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
            disabled={isLoading}
            style={{
              padding: "10px 20px",
              backgroundColor: isLoading ? "#aaa" : "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            {isLoading ? "Submitting..." : buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoredProcedureTemplate;