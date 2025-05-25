import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});


// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx causes this function to trigger
    let errorMessage = "An unexpected error occurred";

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status, data } = error.response;

      switch (status) {
        case 400:
          errorMessage =
            data.message || "Bad request. Please check your input.";
          break;
        case 401:
          errorMessage = "Unauthorized. Please log in again.";
          break;
        case 403:
          errorMessage =
            "Forbidden. You don't have permission to access this resource.";
          break;
        case 404:
          errorMessage = data.message || "Resource not found.";
          break;
        case 409:
          errorMessage = data.message || "Conflict occurred.";
          break;
        case 422:
          errorMessage =
            data.message || "Validation error. Please check your input.";
          break;
        case 429:
          errorMessage = "Too many requests. Please try again later.";
          break;
        case 500:
          errorMessage = "Internal server error. Please try again later.";
          break;
        case 502:
          errorMessage = "Bad gateway. Server is temporarily unavailable.";
          break;
        case 503:
          errorMessage = "Service unavailable. Please try again later.";
          break;
        default:
          errorMessage =
            data.message || `Error ${status}: ${error.response.statusText}`;
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = "Network error. Please check your internet connection.";
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message || "Request setup error";
    }

    // Show toast notification for errors
    toast.error(errorMessage);

    // Modify the error object to include our custom message
    error.customMessage = errorMessage;

    return Promise.reject(error);
  }
);

export default axiosInstance;
