// App.js

import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import StoredProcedureTemplate from "./components/StoredProcedureTemplate";
import ViewTemplate from "./components/ViewTemplate";
import { fetchViewData, executeProcedure, fetchOptions } from "./utils/api";

const App = () => {
  const [screen, setScreen] = useState("menu");
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [selectedView, setSelectedView] = useState(null);
  const [viewData, setViewData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const procedures = [
    { title: "Add Owner", procedureName: "add_owner", parameters: [
        { name: "ip_username", placeholder: "Enter username" },
        { name: "ip_first_name", placeholder: "Enter first name" },
        { name: "ip_last_name", placeholder: "Enter last name" },
        { name: "ip_address", placeholder: "Enter address" },
        { name: "ip_birthdate", placeholder: "Enter birthdate", type: "date" }
    ] },
    { title: "Add Employee", procedureName: "add_employee", parameters: [
        { name: "ip_username", placeholder: "Enter username" },
        { name: "ip_first_name", placeholder: "Enter first name" },
        { name: "ip_last_name", placeholder: "Enter last name" },
        { name: "ip_address", placeholder: "Enter address" },
        { name: "ip_birthdate", placeholder: "Enter birthdate", type: "date" },
        { name: "ip_taxID", placeholder: "Enter tax ID" },
        { name: "ip_hired", placeholder: "Enter hire date", type: "date" },
        { name: "ip_employee_experience", placeholder: "Enter experience (years)", type: "number" },
        { name: "ip_salary", placeholder: "Enter salary", type: "number" }
    ] },
    { title: "Add Driver Role", procedureName: "add_driver_role", parameters: [
        { name: "ip_username", placeholder: "Enter username" },
        { name: "ip_licenseID", placeholder: "Enter license ID" },
        { name: "ip_license_type", placeholder: "Enter license type" },
        { name: "ip_driver_experience", placeholder: "Enter driver experience (years)", type: "number" }
    ] },
    { title: "Add Worker Role", procedureName: "add_worker_role", parameters: [
      { name: "ip_username", placeholder: "Enter username" }
    ] },
    {
      title: "Add Product",
      procedureName: "add_product",
      parameters: [
        { name: "ip_barcode", placeholder: "Enter barcode" },
        { name: "ip_name", placeholder: "Enter product name" },
        { name: "ip_weight", placeholder: "Enter weight", type: "number" },
      ],
    },
    {
      title: "Add Van",
      procedureName: "add_van",
      parameters: [
        { name: "ip_id", placeholder: "Enter van ID", fetchOptions: "/options/vans" },
        { name: "ip_tag", placeholder: "Enter tag", type: "number" },
        { name: "ip_fuel", placeholder: "Enter fuel amount",  type: "number" },
        { name: "ip_capacity", placeholder: "Enter capacity", type: "number" },
        { name: "ip_sales", placeholder: "Enter sales", type: "number" },
        { name: "ip_driven_by",
          placeholder: "Select driver",
          fetchOptions: "/options/drivers",
        },
      ],
    },
    {
      title: "Add Business",
      procedureName: "add_business",
      parameters: [
        { name: "ip_long_name", placeholder: "Enter long name" },
        { name: "ip_rating", placeholder: "Enter rating", type: "number" },
        { name: "ip_spent", placeholder: "Enter spent amount", type: "number" },
        {
          name: "ip_location",
          placeholder: "Select location",
          fetchOptions: "/options/locations",
        },
      ],
    },
    {
      title: "Add Service",
      procedureName: "add_service",
      parameters: [
        { name: "ip_id", placeholder: "Enter service ID" },
        { name: "ip_long_name", placeholder: "Enter long name" },
        {
          name: "ip_home_base",
          placeholder: "Select home base",
          fetchOptions: "/options/locations",
        },
        {
          name: "ip_manager",
          placeholder: "Select manager",
          fetchOptions: "/options/workers",
        },
      ],
    },
    {
      title: "Add Location",
      procedureName: "add_location",
      parameters: [
        { name: "ip_label", placeholder: "Enter label" },
        { name: "ip_x_coord", placeholder: "Enter x_coord", type: "number" },
        { name: "ip_y_coord", placeholder: "Enter y_coord", type: "number" },
        { name: "ip_space", placeholder: "Enter space", type: "number" },
      ],
    },
    {
      title: "Start Funding",
      procedureName: "start_funding",
      buttonText: "Fund",
      parameters: [
        {
          name: "ip_owner",
          placeholder: "Select owner",
          fetchOptions: "/options/owners",
        },
        {
          name: "ip_amount",
          placeholder: "Enter invested amount",
          type: "number",
        },
        {
          name: "ip_long_name",
          placeholder: "Select business",
          fetchOptions: "/options/businesses",
        },
        {
          name: "ip_fund_date",
          placeholder: "Select invested date",
          type: "date",
        },
      ],
    },
    {
      title: "Hire Employee",
      procedureName: "hire_employee",
      buttonText: "Hire",
      parameters: [
        {
          name: "ip_username",
          placeholder: "Select employee",
          fetchOptions: "/options/employees",
        },
        {
          name: "ip_id",
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
          name: "ip_username",
          placeholder: "Select employee",
          fetchOptions: "/options/employees",
        },
        {
          name: "ip_id",
          placeholder: "Select service",
          fetchOptions: "/options/services",
        },
      ],
    },
    {
      title: "Manage Service",
      procedureName: "manage_service",
      buttonText: "Begin",
      parameters: [
        {
          name: "ip_username",
          placeholder: "Select worker",
          fetchOptions: "/options/workers",
        },
        {
          name: "ip_id",
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
          name: "ip_username",
          placeholder: "Select driver",
          fetchOptions: "/options/drivers",
        },
        {
          name: "ip_id",
          placeholder: "Select van ID",
          fetchOptions: "/options/vans",
        },
        { name: "ip_tag", placeholder: "Enter tag", type: "number" },
      ],
    },
    {
      title: "Load Van",
      procedureName: "load_van",
      buttonText: "Deliver",
      parameters: [
        {
          name: "ip_id",
          placeholder: "Select van ID",
          fetchOptions: "/options/vans",
        },
        { name: "ip_tag", placeholder: "Enter tag", type: "number" },
        {
          name: "ip_barcode",
          placeholder: "Select product",
          fetchOptions: "/options/products",
        },
        { name: "ip_quantity", placeholder: "Enter quantity", type: "number" },
        { name: "ip_price", placeholder: "Enter price", type: "number" },
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
          name: "ip_id",
          placeholder: "Select van ID",
          fetchOptions: "/options/vans",
        },
        { name: "ip_tag", placeholder: "Enter tag", type: "number" },
        { name: "ip_destination", placeholder: "Enter destination",
          fetchOptions: "/options/locations"
         },
      ],
    },
    {
      title: "Purchase Product",
      procedureName: "purchase_product",
      buttonText: "Purchase",
      parameters: [
        {
          name: "ip_long_name",
          placeholder: "Select business",
          fetchOptions: "/options/businesses",
        },
        {
          name: "ip_id",
          placeholder: "Select van ID",
          fetchOptions: "/options/vans",
        },
        { name: "ip_tag", placeholder: "Enter tag", type: "number" },
        {
          name: "ip_barcode",
          placeholder: "Select product",
          fetchOptions: "/options/products",
        },
        { name: "ip_quantity", placeholder: "Enter product quantity", type: "number" },
      ],
    },
    {
      title: "Remove Product",
      procedureName: "remove_product",
      buttonText: "Remove",
      parameters: [
        {
          name: "ip_barcode",
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
          name: "ip_id",
          placeholder: "Select van ID",
          fetchOptions: "/options/vans",
        },
        { name: "ip_tag", placeholder: "Enter tag", type: "number" },
      ],
    },
    {
      title: "Remove Driver Role",
      procedureName: "remove_driver_role",
      buttonText: "Remove",
      parameters: [
        {
          name: "ip_username",
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
