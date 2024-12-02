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
    { title: "Add Owner", procedureName: "add_owner", parameters: [
        { name: "first_name", placeholder: "Enter first name" },
        { name: "last_name", placeholder: "Enter last name" },
        { name: "username", placeholder: "Enter username" },
        { name: "address", placeholder: "Enter address" },
        { name: "birthdate", placeholder: "Enter birthdate", type: "date" }
    ] },
    { title: "Add Employee", procedureName: "add_employee", parameters: [
        { name: "first_name", placeholder: "Enter first name" },
        { name: "last_name", placeholder: "Enter last name" },
        { name: "username", placeholder: "Enter username" },
        { name: "address", placeholder: "Enter address" },
        { name: "birthdate", placeholder: "Enter birthdate", type: "date" },
        { name: "taxID", placeholder: "Enter tax ID" },
        { name: "hired_date", placeholder: "Enter hire date", type: "date" },
        { name: "salary", placeholder: "Enter salary" },
        { name: "experience", placeholder: "Enter experience (years)" }
    ] },
    { title: "Add Driver Role", procedureName: "add_driver_role", parameters: [
        { name: "licenseID", placeholder: "Enter license ID" },
        { name: "username", placeholder: "Enter username" },
        { name: "license_type", placeholder: "Enter license type" },
        { name: "driver_experience", placeholder: "Enter driver experience (years)" }
    ] },
    {
      title: "Add Product",
      procedureName: "add_product",
      parameters: [
        { name: "barcode", placeholder: "Enter barcode" },
        { name: "name", placeholder: "Enter product name" },
        { name: "weight", placeholder: "Enter weight", type: "number" },
      ],
    },
    {
      title: "Add Van",
      procedureName: "add_van",
      parameters: [
        { name: "ID", placeholder: "Enter van ID", dropdownOptions: ["lcc", "van1", "van2", "van3"] },
        { name: "tag", placeholder: "Enter tag", type: "number" },
        { name: "fuel", placeholder: "Enter fuel amount",  type: "number" },
        { name: "capacity", placeholder: "Enter capacity", type: "number" },
        { name: "sales", placeholder: "Enter sales", type: "number" },
        { 
          name: "driven_by", 
          placeholder: "Select driver",  
          dropdownOptions: ["awilson5", "other_driver1", "other_driver2"] 
        },
      ],
    },
    {
      title: "Add Business",
      procedureName: "add_business",
      parameters: [
        { name: "long_name", placeholder: "Enter long_name" },
        { name: "rating", placeholder: "Enter rating", type: "number" },
        { name: "spent", placeholder: "Enter spent amount",  type: "number" },
        { name: "location", placeholder: "Enter location" },
      ],
    },
    {
      title: "Add Service",
      procedureName: "add_service",
      parameters: [
        { name: "id", placeholder: "Enter id" },
        { name: "long_name", placeholder: "Enter long_name" },
        { name: "home_base", placeholder: "Enter home_base" },
        { name: "manager", placeholder: "Enter manager" },
      ],
    },
    {
      title: "Add Location",
      procedureName: "add_location",
      parameters: [
        { name: "label", placeholder: "Enter label" },
        { name: "y_coord", placeholder: "Enter x_coord", type: "number"},
        { name: "x_coord", placeholder: "Enter y_coord", type: "number" },
        { name: "space", placeholder: "Enter space" , type: "number"},
      ],
    },
    {
      title: "Start Funding",
      procedureName: "start_funding",
      buttonText: "Fund",
      parameters: [
        { name: "ip_owner", placeholder: "Select ip_owner", dropdownOptions: ["cjordan5", "van1", "van2", "van3"] },
        { name: "ip_amount", placeholder: "Enter ip_amount", type: "number"},
        { name: "ip_long_name", placeholder: "Select ip_long_name", dropdownOptions: ["Innovation Ventures", "option1", "option2"]},
        { name: "ip_fund_date", placeholder: "Select ip_fund_date" ,  type: "date"},
      ],
    },
    {
      title: "Hire Employee",
      procedureName: "hire_employee",
      buttonText: "Hire",
      parameters: [
        { name: "ip_username", placeholder: "Enter ip_username" },
        { name: "ip_id", placeholder: "Enter ip_id" },
      ],
    },
    {
      title: "Fire Employee",
      procedureName: "fire_employee",
      buttonText: "Remove",
      parameters: [
        { name: "ip_username", placeholder: "Enter ip_username" },
        { name: "ip_id", placeholder: "Enter ip_id" },
      ],
    },
    {
      title: "Manage Services",
      procedureName: "manage_services",
      buttonText: "Begin",
      parameters: [
        { name: "username", placeholder: "Enter username" },
        { name: "ID", placeholder: "Enter ID" },
      ],
    },
    {
      title: "Takeover Van",
      procedureName: "takeover_van",
      buttonText: "Add",
      parameters: [
        { name: "username", placeholder: "Select username", dropdownOptions: ["awilson5", "option2", "option3"] },
        { name: "ID", placeholder: "Select ID", dropdownOptions: ["lcc", "option2", "option3"] },
        { name: "tag", placeholder: "Enter tag", type: "number" },
      ],
    },
    {
      title: "Load Van",
      procedureName: "load_van",
      buttonText: "Deliver",
      parameters: [
        { name: "ID", placeholder: "Select ID", dropdownOptions: ["mbm", "option2", "option3"] },
        { name: "barcode", placeholder: "Select barcode", dropdownOptions: ["hm_5ELR", "option2", "option3"] },
        { name: "tag", placeholder: "Enter tag", type: "number" },
        { name: "num of packages", placeholder: "enter number of packages", type: "number"},
        { name: "price", placeholder: "enter price", type: "number"}
      ],
    },
    {
      title: "Refuel Van",
      procedureName: "refuel_van",
      buttonText: "Refuel",
      parameters: [
        { name: "ID", placeholder: "Select ID", dropdownOptions: ["mbm", "option2", "option3"] },
        { name: "tag", placeholder: "Enter tag", type: "number" },
        { name: "More Fuel", placeholder: "enter Fuel Added", type: "number"}
      ],
    },
    {
      title: "Drive Van",
      procedureName: "drive_van",
      buttonText: "Drive",
      parameters: [
        { name: "ID", placeholder: "Select ID", dropdownOptions: ["mbm", "option2", "option3"] },
        { name: "tag", placeholder: "Enter tag", type: "number" },
        { name: "Destination", placeholder: "enter Destination" }
      ],
    },
    {
      title: "Purchase Product",
      procedureName: "purchase_product",
      buttonText: "Purchase",
      parameters: [
        { name: "Long Name", placeholder: "Select Long Name", dropdownOptions: ["Prime Solutions", "option2", "option3"] },
        { name: "ID", placeholder: "Select ID", dropdownOptions: ["mbm", "option2", "option3"] },
        { name: "Tag", placeholder: "Enter tag", type: "number" },
        { name: "Barcode", placeholder: "Select barcode", dropdownOptions: ["hm_5ELR", "option2", "option3"] },
        { name: "Quantity", placeholder: "enter Product Quantity", type: "number"}
      ],
    },
    {
      title: "Remove Product",
      procedureName: "remove_product",
      buttonText: "Remove",
      parameters: [
        { name: "Barcode", placeholder: "Select barcode", dropdownOptions: ["hm_5ELR", "option2", "option3"] },
      ],
    },
    {
      title: "Remove Van",
      procedureName: "remove_van",
      buttonText: "Remove",
      parameters: [
        { name: "ID", placeholder: "Select ID", dropdownOptions: ["pub", "option2", "option3"] },
        { name: "Tag", placeholder: "Enter tag", type: "number" },
      ],
    },
    {
      title: "Remove Driver Role",
      procedureName: "remove_driver_role",
      buttonText: "Remove",
      parameters: [
        { name: "username", placeholder: "Select username", dropdownOptions: ["awilson5", "option2", "option3"] },
      ],
    },

    // Additional procedures go here...
];

  const views = [
    {
      title: "Owner Details",
      columns: ["username", "first_name", "last_name", "birthdate", "address"],
    },
    {
      title: "Employee Details",
      columns: ["username", "taxID", "salary", "hired", "Employee_experience", "licenseID", "Driving_experience", "manager_status"],
    },
    {
      title: "Driver Details",
      columns: ["username", "licenseID", "successful_trips", "num_vans"]
    },
    {
      title: "Location Details",
      columns: ["label", "long_name", "x_coord", "y_coord", "space", "num_vans", "van_ids", "remaining_capacity"]
    },
    {
      title: "Product Details",
      columns: ["product_name", "location", "amount_available", "low_price", "high_price"]
    },
    {
      title: "Service Details",
      columns: ["id", "Long_name", "Home_base", "Manager", "Revenue", "Products_carried", "Cost_carried", "Weight_carried"]
    }
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
          buttonText={selectedProcedure.buttonText || "Submit"} 
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
