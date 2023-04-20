// Constants.js
const production = {
  url: "https://widgetsy-backend.onrender.com",
};
const development = {
  url: "http://localhost:8000",
};
export const config =
  process.env.NODE_ENV === "development" ? development : production;
