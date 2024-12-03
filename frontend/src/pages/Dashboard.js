import React from "react";

const Dashboard = ({ procedures, views, onProcedureSelect, onViewSelect }) => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Business Supply System</h1>
      <h3>Stored Procedures</h3>
      {procedures.map((proc, index) => (
        <button
          key={index}
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundImage: "linear-gradient(45deg, #6a11cb, #2575fc)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px", // Optional for rounded corners
          }}
          onClick={() => onProcedureSelect(proc)}
        >
          {proc.title}
        </button>
      ))}
      <h3>Views</h3>
      {views.map((view, index) => (
        <button
          key={index}
          style={{
            padding: "10px 20px",
            margin: "10px",
            backgroundImage: "linear-gradient(45deg, #6a11cb, #2575fc)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px", // Optional for rounded corners
          }}
          onClick={() => onViewSelect(view)}
        >
          {view.title}
        </button>
      ))}
    </div>
  );
};

export default Dashboard;