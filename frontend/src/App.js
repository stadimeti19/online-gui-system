// App.js

import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import StoredProcedureTemplate from "./components/StoredProcedureTemplate";
import ViewTemplate from "./components/ViewTemplate";
import { fetchViewData, executeProcedure } from "./utils/api";

const App = () => {
  const [screen, setScreen] = useState("menu");
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [selectedView, setSelectedView] = useState(null);
  const [viewData, setViewData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const procedures = [
    { title: "Add Owner", procedureName: "add_owner", parameters: [
        { name: "username", placeholder: "Enter username" },
        { name: "first_name", placeholder: "Enter first name" },
        { name: "last_name", placeholder: "Enter last name" },
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
          fetchOptions: "/options/drivers",
        },
        {
          name: "located_at",
          placeholder: "Select location",
          fetchOptions: "/options/locations",
        },
      ],
    },
    {
      title: "Add Business",
      procedureName: "add_business",
      parameters: [
        { name: "long_name", placeholder: "Enter long name" },
        { name: "rating", placeholder: "Enter rating", type: "number" },
        { name: "spent", placeholder: "Enter spent amount", type: "number" },
        {
          name: "location",
          placeholder: "Select location",
          fetchOptions: "/options/locations",
        },
      ],
    },
    {
      title: "Add Service",
      procedureName: "add_service",
      parameters: [
        { name: "id", placeholder: "Enter service ID" },
        { name: "long_name", placeholder: "Enter long name" },
        {
          name: "home_base",
          placeholder: "Select home base",
          fetchOptions: "/options/locations",
        },
        {
          name: "manager",
          placeholder: "Select manager",
          fetchOptions: "/options/workers",
        },
      ],
    },
    {
      title: "Add Location",
      procedureName: "add_location",
      parameters: [
        { name: "label", placeholder: "Enter label" },
        { name: "x_coord", placeholder: "Enter x_coord", type: "number" },
        { name: "y_coord", placeholder: "Enter y_coord", type: "number" },
        { name: "space", placeholder: "Enter space", type: "number" },
      ],
    },
    {
      title: "Start Funding",
      procedureName: "start_funding",
      buttonText: "Fund",
      parameters: [
        {
          name: "username",
          placeholder: "Select owner",
          fetchOptions: "/options/owners",
        },
        {
          name: "invested",
          placeholder: "Enter invested amount",
          type: "number",
        },
        {
          name: "invested_date",
          placeholder: "Select invested date",
          type: "date",
        },
        {
          name: "business",
          placeholder: "Select business",
          fetchOptions: "/options/businesses",
        },
      ],
    },
    {
      title: "Hire Employee",
      procedureName: "hire_employee",
      buttonText: "Hire",
      parameters: [
        {
          name: "username",
          placeholder: "Select employee",
          fetchOptions: "/options/employees",
        },
        {
          name: "id",
          placeholder: "Select service",
          fetchOptions: "/options/services",
        },
      ],
    },
    {
      title: "Fire Employee",
      procedureName: "fire_employee",
      buttonText: "Remove",
      parameters: [
        {
          name: "username",
          placeholder: "Select employee",
          fetchOptions: "/options/employees",
        },
        {
          name: "id",
          placeholder: "Select service",
          fetchOptions: "/options/services",
        },
      ],
    },
    {
      title: "Manage Services",
      procedureName: "manage_services",
      buttonText: "Begin",
      parameters: [
        {
          name: "username",
          placeholder: "Select worker",
          fetchOptions: "/options/workers",
        },
        {
          name: "id",
          placeholder: "Select service",
          fetchOptions: "/options/services",
        },
      ],
    },
    {
      title: "Takeover Van",
      procedureName: "takeover_van",
      buttonText: "Add",
      parameters: [
        {
          name: "username",
          placeholder: "Select driver",
          fetchOptions: "/options/drivers",
        },
        {
          name: "id",
          placeholder: "Select van ID",
          fetchOptions: "/options/vans",
        },
        { name: "tag", placeholder: "Enter tag", type: "number" },
      ],
    },
    {
      title: "Load Van",
      procedureName: "load_van",
      buttonText: "Deliver",
      parameters: [
        {
          name: "id",
          placeholder: "Select van ID",
          fetchOptions: "/options/vans",
        },
        { name: "tag", placeholder: "Enter tag", type: "number" },
        {
          name: "barcode",
          placeholder: "Select product",
          fetchOptions: "/options/products",
        },
        { name: "quantity", placeholder: "Enter quantity", type: "number" },
        { name: "price", placeholder: "Enter price", type: "number" },
      ],
    },
    {
      title: "Refuel Van",
      procedureName: "refuel_van",
      buttonText: "Refuel",
      parameters: [
        {
          name: "id",
          placeholder: "Select van ID",
          fetchOptions: "/options/vans",
        },
        { name: "tag", placeholder: "Enter tag", type: "number" },
        { name: "fuel", placeholder: "Enter fuel added", type: "number" },
      ],
    },
    {
      title: "Drive Van",
      procedureName: "drive_van",
      buttonText: "Drive",
      parameters: [
        {
          name: "id",
          placeholder: "Select van ID",
          fetchOptions: "/options/vans",
        },
        { name: "tag", placeholder: "Enter tag", type: "number" },
        { name: "destination", placeholder: "Enter destination" },
      ],
    },
    {
      title: "Purchase Product",
      procedureName: "purchase_product",
      buttonText: "Purchase",
      parameters: [
        {
          name: "business",
          placeholder: "Select business",
          fetchOptions: "/options/businesses",
        },
        {
          name: "id",
          placeholder: "Select van ID",
          fetchOptions: "/options/vans",
        },
        { name: "tag", placeholder: "Enter tag", type: "number" },
        {
          name: "barcode",
          placeholder: "Select product",
          fetchOptions: "/options/products",
        },
        { name: "quantity", placeholder: "Enter product quantity", type: "number" },
      ],
    },
    {
      title: "Remove Product",
      procedureName: "remove_product",
      buttonText: "Remove",
      parameters: [
        {
          name: "barcode",
          placeholder: "Select product",
          fetchOptions: "/options/products",
        },
      ],
    },
    {
      title: "Remove Van",
      procedureName: "remove_van",
      buttonText: "Remove",
      parameters: [
        {
          name: "id",
          placeholder: "Select van ID",
          fetchOptions: "/options/vans",
        },
        { name: "tag", placeholder: "Enter tag", type: "number" },
      ],
    },
    {
      title: "Remove Driver Role",
      procedureName: "remove_driver_role",
      buttonText: "Remove",
      parameters: [
        {
          name: "username",
          placeholder: "Select driver",
          fetchOptions: "/options/drivers",
        },
      ],
    },
  ];

  const views = [
    {
      title: "Display_Owner_View",
      columns: ["username", "first_name", "last_name", "address", "numOfBussinesses", "numOfPlaces", "highs", "lows", "debt"],
    },
    {
      title: "Display_Employee_View",
      columns: [
        "username",
        "taxID",
        "salary",
        "hired",
        "experience",
        "licenseIdentifier",
        "drivingExperience",
        "manager_status",
      ],
    },
    {
      title: "Display_Driver_View",
      columns: ["username", "licenseID", "successful_trips", "numOfVans"]
    },
    {
      title: "Display_Location_View",
      columns: ["label", "long_name", "x_coord", "y_coord", "space", "num_vans", "van_ids", "remaining_capacity"]
    },
    {
      title: "Display_Product_View",
      columns: ["product_name", "location", "amount_available", "low_price", "high_price"]
    },
    {
      title: "Display_Service_View",
      columns: ["id", "long_name", "home_base", "manager", "revenue", "products_carried", "cost_carried", "weight_carried"]
    }
  ];

  const handleProcedureSubmit = async (procedureName, formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await executeProcedure(procedureName, Object.values(formData));
      console.log("Procedure executed successfully:", result);
      setScreen("menu");
    } catch (err) {
      console.error("Error executing procedure:", err);
      setError("Failed to execute procedure. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewSelect = async (view) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchViewData(view.title.replaceAll(" ", "_").toLowerCase()); // Format view name
      setViewData(data);
      setSelectedView(view);
      setScreen("view");
    } catch (err) {
      console.error("Error fetching view data:", err);
      setError("Failed to fetch view data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goBackToDashboard = () => {
    setScreen("menu");
    setError(null);
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

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
          onCancel={goBackToDashboard}
        />
      )}

      {screen === "view" && selectedView && (
        <ViewTemplate
          title={selectedView.title}
          columns={selectedView.columns}
          data={viewData}
          onBack={goBackToDashboard}
        />
      )}
    </div>
  );
};

export default App;