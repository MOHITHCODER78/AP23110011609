import axios from 'axios';
import { Log } from '../middleware/logger';

// Getting our API link and access token from the .env file
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

// We create a pre-configured axios client so we don't have to add the token manually every time
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

// here we fetch the notifications from the server and this function handles pagination (page/limit) and filtering (type).
export const getNotifications = async (page = 1, limit = 10, type = 'All') => {
  try {
    // here we log that we are starting to fetch data
    await Log("frontend", "info", "api", `Starting fetch: Page ${page}, Type ${type}`);

    const params = {
      page: page,
      limit: limit
    };

    // If the user wants a specific type (not "All"), we add it to the request
    if (type !== 'All') {
      params.notification_type = type;
    }

    // Making the actual GET request
    const response = await apiClient.get('/notifications', { params });

    // Log that we successfully got the data
    await Log("frontend", "info", "api", "Notifications loaded successfully");

    return response.data;
  } catch (error) {
    // If something goes wrong, we log the error message back to the server
    const errorMessage = error.response?.data?.message || error.message;
    await Log("frontend", "error", "api", `Fetch failed: ${errorMessage}`);

    // here we pass the error back so the UI can show an alert
    throw error;
  }
};

