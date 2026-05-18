const API_BASE_URL =
  import.meta.env.DEV
    ? "http://localhost:3000"
    : "/api";


export { API_BASE_URL };

export const apiCall = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const headers = new Headers(options.headers);

  headers.set('Content-Type', 'application/json');

  const token = localStorage.getItem('accessToken');

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
};
