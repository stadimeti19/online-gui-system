import React, { useEffect, useState } from "react";
import { fetchViewData } from "../utils/api"; // Import API call function

const ViewTemplate = ({ title, columns, onBack }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchViewData(title.replace(" ", "_").toLowerCase()); // Replace spaces with underscores for view name
        setData(result);
      } catch (err) {
        console.error("Error fetching view data:", err);
        setError("Failed to load view data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [title]);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>{title}</h2>
      <button
        onClick={onBack}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "#ccc",
          border: "none",
          cursor: "pointer",
        }}
      >
        Back
      </button>
      {isLoading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!isLoading && !error && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "left",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    style={{ border: "1px solid black", padding: "8px" }}
                  >
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewTemplate;