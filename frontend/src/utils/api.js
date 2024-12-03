const API_BASE_URL = "http://localhost:5001/api";

// Execute a stored procedure
export const executeProcedure = async (procedureName, params) => {
    try {
        const response = await fetch(`${API_BASE_URL}/procedures/execute`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ procedureName, params }),
        });
        return await response.json();
    } catch (err) {
        console.error("Error executing procedure:", err);
        throw err;
    }
};

// Fetch data from a view
export const fetchViewData = async (viewName) => {
    try {
        const response = await fetch(`${API_BASE_URL}/views/${viewName}`);
        return await response.json();
    } catch (err) {
        console.error("Error fetching view data:", err);
        throw err;
    }
};