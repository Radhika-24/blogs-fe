export const API_URL = "http://localhost:3001/";

export const fetchApi = async (endpoint, auth, method, body) => {
  const headers = {
    "Content-type": "application/json",
  };
  if (auth) {
    headers.Authorization = `Bearer ${localStorage.getItem("TOKEN")}`;
  }
  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: JSON.stringify(body),
  });
  if (res.status === 200) {
    return await res.json();
  }
  return res;
};