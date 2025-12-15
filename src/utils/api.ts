// Utility functions for API calls

/**
 * Get the base URL for API calls based on environment
 * @returns The base URL for API calls
 */
export const getApiBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || '';
};

/**
 * Make a POST request to the API
 * @param endpoint - The API endpoint (without base URL)
 * @param data - The data to send in the request body
 * @returns The response from the API
 */
export const apiPost = async (endpoint: string, data: Record<string, unknown>) => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  return response.json();
};