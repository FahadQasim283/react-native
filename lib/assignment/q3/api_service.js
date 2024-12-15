const API_BASE_URL = "http://localhost:8081/articles"; 
const fetchWithRetry = async (url, options, retries = 3) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... (${retries} left)`);
      return await fetchWithRetry(url, options, retries - 1);
    } else {
      throw error;
    }
  }
};

const apiService = {
  getArticles: async () => {
    return await fetchWithRetry(API_BASE_URL, {
      method: "GET",
    });
  },

  createArticle: async (data) => {
    return await fetchWithRetry(API_BASE_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateArticle: async (id, data) => {
    return await fetchWithRetry(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  deleteArticle: async (id) => {
    return await fetchWithRetry(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
  },
};

export default apiService;
