export const fetchModel = async (type) => {
    try {
      const response = await fetch(`http://localhost:5000/api/getModel/${type}`);
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch model");
      }
  
      return data.modelURL; // URL of the model
    } catch (error) {
      console.error("Error fetching model:", error);
      return null;
    }
  };
  