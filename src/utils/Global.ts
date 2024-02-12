// Retrieve all global configuration of the app from .env file
// this work to be done
export const Global = {
  url: "http://localhost:8080",
  headers: {
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  },
};