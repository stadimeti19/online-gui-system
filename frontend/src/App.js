import React, { useState } from "react";
import Dashboard from "./pages/Dashboard"; // Updated import
import StoredProcedureTemplate from "./components/StoredProcedureTemplate";
import ViewTemplate from "./components/ViewTemplate";

const App = () => {
  const [screen, setScreen] = useState("menu"); // Tracks the current screen
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [selectedView, setSelectedView] = useState(null);
  const [viewData, setViewData] = useState([]);

  const procedures = [
    {
      title: "Add Owner",
      procedureName: "add_owner",
      parameters: [
        { name: "username", placeholder: "Enter username" },
        { name: "first_name", placeholder: "Enter first name" },
        { name: "last_name", placeholder: "Enter last name" },
        { name: "birthdate", placeholder: "Enter birthdate", type: "date" },
        { name: "address", placeholder: "Enter address" },
      ],
    },
  ];

  const views = [
    {
      title: "Owner Details",
      columns: ["username", "first_name", "last_name", "birthdate", "address"],
    },
  ];

  const handleProcedureSubmit = (procedureName, formData) => {
    console.log(`Executing procedure: ${procedureName}`, formData);
    setScreen("menu"); // Navigate back to the dashboard
  };

  const handleViewSelect = (view) => {
    console.log(`Fetching view data for: ${view.title}`);
    setViewData([
      {
        username: "awilson5",
        first_name: "Aaron",
        last_name: "Wilson",
        birthdate: "1963-11-11",
        address: "220 Peachtree Street",
      },
    ]);
    setSelectedView(view);
    setScreen("view");
  };

  const goBackToDashboard = () => setScreen("menu"); // Helper function to navigate back

  return (
    <div>
      {screen === "menu" && (
        <Dashboard
          procedures={procedures}
          views={views}
          onProcedureSelect={(procedure) => {
            setSelectedProcedure(procedure);
            setScreen("procedure");
          }}
          onViewSelect={handleViewSelect}
        />
      )}
      {screen === "procedure" && selectedProcedure && (
        <StoredProcedureTemplate
          title={selectedProcedure.title}
          procedureName={selectedProcedure.procedureName}
          parameters={selectedProcedure.parameters}
          onSubmit={handleProcedureSubmit}
          onCancel={goBackToDashboard} // Pass goBack function to cancel
        />
      )}
      {screen === "view" && selectedView && (
        <ViewTemplate
          title={selectedView.title}
          columns={selectedView.columns}
          data={viewData}
          onBack={goBackToDashboard} // Pass goBack function to the back button
        />
      )}
    </div>
  );
};

export default App;
